import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { TRANSACTIONS_LIST} from './mock-transactions'

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }

  getTransactions() : Transaction[] {
    return TRANSACTIONS_LIST;
  }
}
