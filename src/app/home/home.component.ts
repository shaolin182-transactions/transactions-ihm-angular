import { Component, OnInit } from '@angular/core';
import { OAuthService  } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
      // Automatically load user profile

    }

  ngOnInit(): void {
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
