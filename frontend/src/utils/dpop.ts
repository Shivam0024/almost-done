// src/utils/dpop.ts
import { generateKeyPair, exportJWK, SignJWT } from "jose";

let privateKey: CryptoKey | null = null;
let publicJwk: any = null;

/**
 * Initialize DPoP keypair (in-memory). Returns public JWK.
 */
export async function initDPoP() {
  if (privateKey && publicJwk) return publicJwk;
  // generateKeyPair will use SubtleCrypto in modern browsers
  const { publicKey, privateKey: priv } = await generateKeyPair("ES256");
  privateKey = priv;
  publicJwk = await exportJWK(publicKey);

  // Recommended: remove any `kid` to let consumer compute thumbprint the same way,
  // but exportJWK usually does not include kid for ephemeral keys.
  // Store public JWK for debugging if you want:
  try {
    sessionStorage.setItem("dpop_public", JSON.stringify(publicJwk));
  } catch (e) {
    /* ignore storage errors */
  }

  return publicJwk;
}

/**
 * Create a DPoP proof JWT for `method` and `url`.
 * - header must include jwk (the public key)
 * - claims: htm, htu, iat, jti
 */
export async function createDPoPProof(method: string, url: string) {
  if (!privateKey || !publicJwk) {
    await initDPoP();
  }

  const now = Math.floor(Date.now() / 1000);
  // create unique jti
  const jti = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${now}-${Math.random().toString(36).slice(2)}`;

  const jwt = await new SignJWT({
    htu: url,
    htm: method.toUpperCase(),
    iat: now,
    jti,
  })
    .setProtectedHeader({
      alg: "ES256",
      typ: "dpop+jwt",
      jwk: publicJwk,
    })
    .sign(privateKey!);

  return jwt;
}
