import { Component } from '@angular/core';
import { OAuthService  } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { keycloakAuthConfig } from './auth.keycloak.config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'transactions-ihm-angular';

    constructor(private oauthService: OAuthService) {
        this.configureCodeFlow();
    }

    private configureCodeFlow() {
        this.oauthService.configure(keycloakAuthConfig);
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
//         this.oauthService.loadDiscoveryDocument();

        // Optional
//         this.oauthService.setupAutomaticSilentRefresh();
      }

}
