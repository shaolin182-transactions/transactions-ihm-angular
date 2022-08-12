import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { SidenavService } from 'src/app/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  toggleActive:boolean = false;

  constructor(private oauthService: OAuthService, private sidenav: SidenavService) {
  }

  toggleRightSidenav() {
		this.toggleActive = !this.toggleActive;
		this.sidenav.toggle();

	}

  private configureCodeFlow() {
    console.log("Configure Code Flow")
    this.oauthService.events.subscribe(e => console.log(e));
    this.oauthService.initCodeFlow();
  }

  public login() {
      this.configureCodeFlow();

  }

}
