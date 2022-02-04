import { Component, OnInit } from '@angular/core';
import { OAuthService  } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { keycloakAuthConfig } from '../auth.keycloak.config'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
    // Automatically load user profile

  }

  ngOnInit(): void {
  }

  private configureCodeFlow() {
    console.log("Configure Code Flow")
//     this.oauthService.configure(keycloakAuthConfig);
//     this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events.subscribe(e => console.log(e));
    this.oauthService.initCodeFlow();
  }

  public login() {
      this.configureCodeFlow();

  }

  public logout() {
      this.oauthService.logOut();
  }

  get userName(): string {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }
}
