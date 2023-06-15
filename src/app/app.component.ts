import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { AuthConfig, OAuthService  } from 'angular-oauth2-oidc';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';
import { APP_CONFIG, AppConfig } from './models/app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'transactions-ihm-angular';

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private oauthService: OAuthService, private sidenavService: SidenavService, @Inject(APP_CONFIG) public config: AppConfig) {
      this.configureCodeFlow();
  }

  private configureCodeFlow() {

    let keycloakAuthConfig: AuthConfig = {
      // Url of the Identity Provider
      issuer: this.config.keyCloakUrl,
    
      // URL of the SPA to redirect the user to after login
      redirectUri: this.config.redirectUri,
    
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

    this.oauthService.configure(keycloakAuthConfig);
    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument(this.config.discoveryUrl).then(() => {

      // This method just tries to parse the token(s) within the url when
      // the auth-server redirects the user back to the web-app
      // It dosn't send the user the the login page
      this.oauthService.tryLogin({});      

    });
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
