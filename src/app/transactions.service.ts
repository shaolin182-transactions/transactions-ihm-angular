import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction } from './models/transaction';
import { BankAccount } from './models/bank-account';
import { TransactionCategory } from './models/transaction-category';
import { TransactionItem } from './models/transaction-item';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions() : Observable<TransactionItem[]> {
    return this.http.get<Transaction[]>(environment.transactionsUrl)
      .pipe(
        map(data => this.mapTransactions(data))
      );
  }

  mapTransactions(data: Transaction[]) : TransactionItem[] {
    return data.map( item => {

        let bankAccount:BankAccount
        let category: TransactionCategory

        if (item.transactions.length == 1){
          bankAccount = item.transactions[0].bankAccount
          category = item.transactions[0].category
        }

        return {
          original: item,
          date : item.date,
          cost: item.cost,
          description : item.description,
          bankAccount: bankAccount,
          category: category
        } as TransactionItem;
    })
  }
}
