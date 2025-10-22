import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://10.229.40.124:8443',  // your Keycloak server URL
  realm: 'chennai-metro',                  // your realm
  clientId: 'cmrl-frontend',                 // your client id
});

export default keycloak;
