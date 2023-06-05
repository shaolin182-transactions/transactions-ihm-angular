import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BankAccount } from '../models/bank-account';
import { AppConfigService } from './app-config.service';
import { APP_CONFIG, AppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) public config: AppConfig) { }

  getBankAccounts() : Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(this.config.bankAccountUrl)
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
