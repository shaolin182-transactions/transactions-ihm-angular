import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service'
import { Transaction } from '../models/transaction';
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig } from '../auth.google.config'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-transactionslist',
  templateUrl: './transactionslist.component.html',
  styleUrls: ['./transactionslist.component.css']
})
export class TransactionslistComponent implements OnInit {

  transactions : Transaction[];

  displayedColumns: string[] = ['id', 'date', 'description', 'cost'];

  constructor(
    private transactionsService : TransactionsService,
    private oauthService: OAuthService) {

    this.oauthService.events
          .pipe(filter((e) => e.type === 'token_received'))
          .subscribe((_) => this.oauthService.loadUserProfile());
    }

  ngOnInit(): void {
//     this.loginCode();
    this.getTransactions();
  }

   async loginCode() {
    // Tweak config for code flow
//     this.oauthService.configure(googleAuthConfig);
//     await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    console.log("Entering loginCode")
    if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
      console.log("No Valid Token")
    } else {
      console.log('Token')
    }
  }

  getTransactions() : void {
    this.transactionsService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }



}
