import { Component } from '@angular/core';
import { OAuthService  } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { googleAuthConfig } from './auth.google.config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'transactions-ihm-angular';

//     constructor(private oauthService: OAuthService) {
//         this.configureCodeFlow();
//
//         // Automatically load user profile
//         this.oauthService.events
//             .pipe(filter(e => e.type === 'token_received'))
//             .subscribe(_ => {
//               console.debug('state', this.oauthService.state);
//               this.oauthService.loadUserProfile();
//             });
//     }
//
//     private configureCodeFlow() {
//         this.oauthService.configure(googleAuthConfig);
//         this.oauthService.loadDiscoveryDocumentAndLogin();
//
//         // Optional
//         this.oauthService.setupAutomaticSilentRefresh();
//       }
//
//     public login() {
//         this.oauthService.initImplicitFlow();
//     }
//
//     public logout() {
//         this.oauthService.logOut();
//     }
}
