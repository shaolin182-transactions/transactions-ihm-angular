import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Transaction } from './models/transaction';
import { TRANSACTIONS_LIST} from './mock-transactions'

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions() : Observable<Transaction[]> {
    return this.http.get<Transaction[]>("http://localhost:8084/transactions");
  }
}
