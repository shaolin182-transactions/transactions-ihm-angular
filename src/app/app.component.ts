import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OAuthService  } from 'angular-oauth2-oidc';
import { keycloakAuthConfig } from './auth.keycloak.config'
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './sidenav.service';

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
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
