import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BankAccount } from '../models/bank-account';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient) { }

  getBankAccounts() : Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(environment.bankAccountUrl)
    .pipe(
      map(data => this.mapBankAccounts(data))
    );
  }

  mapBankAccounts(data: BankAccount[]): BankAccount[] {
    return data.map( item => this.mapBankAccount(item) )
  }

  mapBankAccount(item: BankAccount): any {
    item.sortedLabel = item.category + " > " + item.label;
    return item;
  }
}
