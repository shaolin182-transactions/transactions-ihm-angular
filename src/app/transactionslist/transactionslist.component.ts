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
    private transactionsService : TransactionsService) {

    }

  ngOnInit(): void {
//     this.loginCode();
    this.getTransactions();
  }

  getTransactions() : void {
    this.transactionsService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }
}
