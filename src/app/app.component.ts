import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OAuthService  } from 'angular-oauth2-oidc';
import { keycloakAuthConfig } from './auth.keycloak.config'
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';
import { environment } from '../assets/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'transactions-ihm-angular';

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private oauthService: OAuthService, private sidenavService: SidenavService) {
      this.configureCodeFlow();
  }


  private configureCodeFlow() {
      this.oauthService.configure(keycloakAuthConfig);
      // Load Discovery Document and then try to login the user
      this.oauthService.loadDiscoveryDocument(environment.discoveryUrl).then(() => {

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
