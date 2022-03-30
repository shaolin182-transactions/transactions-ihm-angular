import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction } from './models/transaction';
import { TransactionItem } from './models/transaction-item';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions() : Observable<TransactionItem[]> {
    return this.http.get<Transaction[]>("http://localhost:8080/transactions")
      .pipe(
        map(data => this.mapTransactions(data))
      );
  }

  mapTransactions(data: Transaction[]) : TransactionItem[] {
    return data.map( item => {

        let bankAccount = "Multi"
        let category = "Multi"

        if (item.transactions.length == 1){
          bankAccount = item.transactions[0].bankAccount.category + " > " + item.transactions[0].bankAccount.label
          category = item.transactions[0].category?.category + " > " + item.transactions[0].category?.label
        }

        return {
          original: item,
          date : item.date,
          cost: item.cost,
          description : item.description,
          bankaccount: bankAccount,
          category: category
        } as TransactionItem;
    })
  }
}
