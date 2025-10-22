

// // src/contexts/KeycloakProvider.tsx
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import keycloak from '../keycloak';

// interface KeycloakContextType {
//   keycloak: Keycloak.KeycloakInstance;
//   authenticated: boolean;
//   initialized: boolean;
// }

// const KeycloakContext = createContext<KeycloakContextType>({
//   keycloak,
//   authenticated: false,
//   initialized: false,
// });

// export const useKeycloak = () => useContext(KeycloakContext);

// export const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [initialized, setInitialized] = useState(false);

//   useEffect(() => {
//     keycloak
//       .init({ onLoad: 'check-sso', checkLoginIframe: false })
//       .then((auth) => {
//         setAuthenticated(auth);
//         setInitialized(true);
//       })
//       .catch(() => setInitialized(true));
//   }, []);

//   return (
//     <KeycloakContext.Provider value={{ keycloak, authenticated, initialized }}>
//       {initialized ? children : <div>Loading...</div>}
//     </KeycloakContext.Provider>
//   );
// };




// src/contexts/KeycloakProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import keycloak from '../keycloak';

// DPoP utilities
import { initDPoP, createDPoPProof } from '@/utils/dpop';

interface KeycloakContextType {
  keycloak: Keycloak.KeycloakInstance;
  authenticated: boolean;
  initialized: boolean;
}

const KeycloakContext = createContext<KeycloakContextType>({
  keycloak,
  authenticated: false,
  initialized: false,
});

export const useKeycloak = () => useContext(KeycloakContext);

export const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let originalFetch = window.fetch;

    async function setupAndInit() {
      try {
        // 1) Ensure DPoP keypair exists BEFORE token exchange happens
        await initDPoP();

        // 2) Monkey-patch fetch to add DPoP to token endpoint requests
        originalFetch = window.fetch;
        window.fetch = async (input: RequestInfo, init?: RequestInit) => {
          const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);

          // intercept token endpoint calls (code->token and refresh->token)
          if (url.includes('/protocol/openid-connect/token')) {
            // create DPoP proof for this token request
            // method is POST for token endpoint
            try {
              const dpop = await createDPoPProof('POST', url);
              const headers = new Headers(init?.headers || {});
              headers.set('DPoP', dpop);

              // Pass through other header values and body
              const newInit: RequestInit = {
                ...init,
                headers,
              };
              return originalFetch.call(window, input, newInit);
            } catch (err) {
              console.error('DPoP: failed to create proof for token request', err);
              // fall back to original fetch so Keycloak will throw a proper error
              return originalFetch.call(window, input, init);
            }
          }

          // not a token endpoint — normal fetch
          return originalFetch.call(window, input, init);
        };

        // 3) Now initialize Keycloak (this will make code->token fetch which will be patched)
        keycloak
          .init({ onLoad: 'check-sso', checkLoginIframe: false })
          .then((auth) => {
            setAuthenticated(auth);
            setInitialized(true);
          })
          .catch((e) => {
            console.warn('Keycloak init failed', e);
            setInitialized(true);
          });
      } catch (err) {
        console.error('DPoP init failed', err);
        // still init Keycloak (will fail if Keycloak requires DPoP)
        keycloak
          .init({ onLoad: 'check-sso', checkLoginIframe: false })
          .then((auth) => {
            setAuthenticated(auth);
            setInitialized(true);
          })
          .catch(() => setInitialized(true));
      }
    }

    setupAndInit();

    return () => {
      // restore original fetch on unmount
      if (originalFetch) window.fetch = originalFetch;
    };
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated, initialized }}>
      {initialized ? children : <div>Loading...</div>}
    </KeycloakContext.Provider>
  );
};
