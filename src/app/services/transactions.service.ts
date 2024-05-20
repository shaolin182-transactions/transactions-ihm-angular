import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Transaction } from '../models/transaction';
import { BankAccount } from '../models/bank-account';
import { TransactionCategory } from '../models/transaction-category';
import { TransactionItem } from '../models/transaction-item';

import { TransactionDetail } from '../models/transaction-detail';
import { APP_CONFIG, AppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) public config: AppConfig) { }

  getTransactions() : Observable<TransactionItem[]> {
    return this.http.get<Transaction[]>(this.config.transactionsUrlGet)
      .pipe(
        map(data => this.mapTransactions(data))
      );
  }

  addTransaction(transaction:TransactionItem) : Observable<TransactionItem> {
    let tr = this.mapTransactionItem(transaction);
    return this.http.post<Transaction>(this.config.transactionsUrl, tr)
      .pipe(
        map(data => this.mapTransaction(data))
      );
  }

  putTransaction(transaction:TransactionItem) : Observable<TransactionItem> {
    const id = transaction.original.id;
    let tr = this.mapTransactionItem(transaction);
    return this.http.put<Transaction>(this.config.transactionsUrl + "/" + id, tr, {})
      .pipe(
        map(data => this.mapTransaction(data))
      );
  }

  patchTransactions() : Observable<TransactionItem[]> {
    return this.http.get<Transaction[]>(this.config.transactionsUrl)
      .pipe(
        map(data => this.mapTransactions(data))
      );
  }

  mapTransactions(data: Transaction[]) : TransactionItem[] {
    return data.map( item => this.mapTransaction(item) )
  }

  mapTransaction(item: Transaction) : TransactionItem {
        let bankAccount:BankAccount
        let category: TransactionCategory

        if (item.transactions.length == 1){
          bankAccount = item.transactions[0].bankAccount
          category = item.transactions[0].category
        }

        return {
          original: item,
          date : new Date(Number(item.date) * 1000),
          cost: item.cost,
          description : item.description,
          bankAccount: bankAccount,
          category: category
        } as TransactionItem;

  }

  mapTransactionItem(item: TransactionItem) : Transaction {
    let transactionDetail:TransactionDetail = {} as TransactionDetail;
    transactionDetail.bankAccount = {} as BankAccount;
    if ( transactionDetail.bankAccount != undefined){
      transactionDetail.bankAccount.id = item.bankAccount.id;
//      delete transactionDetail.bankAccount['sortedLabel'];
    }

    if (item.category != undefined) {
      transactionDetail.category = {} as TransactionCategory;
      transactionDetail.category.id = item.category.id;
      // delete transactionDetail.category['sortedLabel'];
    }

    transactionDetail.income = item.cost > 0 ? Math.abs(item.cost / 100) :  0;
    transactionDetail.outcome = item.cost < 0 ?  Math.abs(item.cost / 100) : 0;

    transactionDetail.description = item.description;

    let transaction: Transaction = {
      date : new Date(Number(item.date)),
      cost: item.cost,
      description : item.description,
      transactions: [transactionDetail]
    } as Transaction;

    if (item.original) {
      transaction.id = item.original.id;
    }

    return transaction;

}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
