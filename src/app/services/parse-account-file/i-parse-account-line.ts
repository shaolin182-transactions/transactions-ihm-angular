import { Injectable } from '@angular/core';
import { TransactionItem } from 'src/app/models/transaction-item';


@Injectable()
export abstract class IParseAccountLineService {

    
  /**
   * Build a transaction item from a line of a CSV file
   * @param line the line to parse
   * @returns a TransactionItem object
   */
  abstract buildTransaction(line:string): TransactionItem;

}