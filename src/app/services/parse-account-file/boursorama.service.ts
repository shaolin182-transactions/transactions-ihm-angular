import { Injectable } from '@angular/core';
import { IParseAccountLineService } from './i-parse-account-line';
import { TransactionItem } from 'src/app/models/transaction-item';
import { BankAccount } from 'src/app/models/bank-account';

@Injectable({
  providedIn: 'root'
})
export class BoursoramaLineParserService implements IParseAccountLineService {
  

  readonly #bk = {
    id : 37,
    category : "Perso",
    label: "Boursorama",
    sortedLabel: "Perso > Boursorama"
  } as BankAccount

  readonly #IDX_DATE = 0;
  readonly #IDX_DESCRIPTION = 2;
  readonly #IDX_COST = 6; 
0
  readonly source = "BOURSORAMA";

  buildTransaction(line: string): TransactionItem {
    
    const fields = line.split(';');

    const [year, month, day] = fields[this.#IDX_DATE].split('-');
    const date = new Date(+year, +month - 1, +day)

    const cost = Number(fields[this.#IDX_COST].replace(/ /g, '').replace(/"/g, '').replace(/,/g, '.')) * 100; 

    return {
      original: null,
      date : date,
      cost: cost,
      description : fields[this.#IDX_DESCRIPTION].replace(/"/g, '').replace(/\*/g, ''),
      bankAccount: this.#bk,
      category: null
    } as TransactionItem;
  }
}

