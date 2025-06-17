import { Injectable } from '@angular/core';
import { IParseAccountLineService } from './i-parse-account-line';
import { TransactionItem } from 'src/app/models/transaction-item';
import { BankAccount } from 'src/app/models/bank-account';

@Injectable({
  providedIn: 'root'
})
export class CmbLineParserService implements IParseAccountLineService {
  
  readonly #bk = {
    id : 21,
    category : "Commun",
    label: "CMB",
    sortedLabel: "Commun > CMB"
  } as BankAccount

  readonly #IDX_DATE = 0;
  readonly #IDX_DESCRIPTION = 2;
  readonly #IDX_OUTCOME = 3; 
  readonly #IDX_INCOME = 4;

  readonly source = "CMB";

  buildTransaction(line: string): TransactionItem {
    
    const fields = line.split(';');

    const [day, month, year] = fields[this.#IDX_DATE].replace(/"/g, '').split('/');
    const date = new Date(+year, +month - 1, +day)

    const income = Number(fields[this.#IDX_INCOME].replace(/"/g, '').replace(',', '.'));
    const outcome = Number(fields[this.#IDX_OUTCOME].replace(/"/g, '').replace(',', '.'));

    return {
      original: null,
      date : date,
      cost: (income - outcome) * 100,
      description : fields[this.#IDX_DESCRIPTION].replace(/"/g, '').replace(/\*/g, ''),
      bankAccount: this.#bk,
      category: null
    } as TransactionItem;
  }
}

