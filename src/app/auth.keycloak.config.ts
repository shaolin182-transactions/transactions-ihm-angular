// This api will come in the next version

import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';


export const keycloakAuthConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.keyCloakUrl,

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200/',

  useSilentRefresh: false,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'transactions-client',

  requireHttps: false,

  skipIssuerCheck: true,

  responseType: 'code',

  strictDiscoveryDocumentValidation: false,

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email',

  showDebugInformation: true,

  sessionChecksEnabled: true
};
