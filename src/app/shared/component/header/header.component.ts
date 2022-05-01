import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit(): void {
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
