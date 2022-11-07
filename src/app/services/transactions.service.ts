import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Transaction } from '../models/transaction';
import { BankAccount } from '../models/bank-account';
import { TransactionCategory } from '../models/transaction-category';
import { TransactionItem } from '../models/transaction-item';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions() : Observable<TransactionItem[]> {
    return this.http.get<Transaction[]>(environment.transactionsUrlGet)
      .pipe(
        map(data => this.mapTransactions(data))
      );
  }

  addTransaction(transaction:TransactionItem) : Observable<TransactionItem> {
    return this.http.post<Transaction>(environment.transactionsUrl, {transaction})
      .pipe(
        map(data => this.mapTransaction(data))
      );
  }

  putTransaction(transaction:TransactionItem) : Observable<TransactionItem> {
    const id = transaction.original.id;
    return this.http.put<Transaction>(environment.transactionsUrl + "/" + id, transaction, {})
      .pipe(
        catchError(this.handleError),
        map(data => this.mapTransaction(data))
      );
  }

  patchTransactions() : Observable<TransactionItem[]> {
    return this.http.get<Transaction[]>(environment.transactionsUrl)
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
