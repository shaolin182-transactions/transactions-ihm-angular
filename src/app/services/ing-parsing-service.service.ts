import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount } from '../models/bank-account';
import { TransactionItem } from '../models/transaction-item';

// TODO : refactor, this component should be only about loading file, parsing should be separated in other services

@Injectable({
  providedIn: 'root', 
})
export class IngParsingServiceService {

  fileContent: String;

  private _file: File;

  accountType: String;

  constructor() { }
  
  public get file(): File {
    return this._file;
  }
  public set file(value: File) {
    this._file = value;
  }

  /**
   * Parse File Content from ING datasource
   * @returns a collection of TransactionItem
   */
  parse() : Observable<TransactionItem> {
    if (this.file != undefined){
      let fileReader = new FileReader();
    
      fileReader.readAsText(this.file);

      return new Observable<TransactionItem>(observer => {

        fileReader.onload = (e) => {
          // Get file Content
          this.fileContent = fileReader.result as String;
          const lines:String[] = this.getContentLines(this.fileContent);

          for (var line in lines){
            observer.next(this.buildTransaction(lines[line]))
          }  
    
          observer.complete()
        }   
        
      })
    }
  }


  getContentLines(fileContent: String) : String[] {
    console.log(fileContent);
    return fileContent.split(/\r?\n/);
  }

  buildTransaction(line:String): TransactionItem {

    const fields = line.split(';');

    if (this.accountType == "ING") {

      const bkIng = {
        id : 26,
        category : "Perso",
        label: "ING Direct",
        sortedLabel: "Perso > ING Direct"
      } as BankAccount

      const [day, month, year] = fields[0].split('/');
      const date = new Date(+year, +month - 1, +day)

      return {
        original: null,
        date : date,
        cost: Number(fields[3]?.replace(',', '.')) * 100,
        description : fields[1],
        bankAccount: bkIng,
        category: null
      } as TransactionItem;

    } else if (this.accountType == "BOURSORAMA"){
      // TODO to replace by chosen bank account from GUI
      const bk = {
        id : 37,
        category : "Perso",
        label: "Boursorama",
        sortedLabel: "Perso > Boursorama"
      } as BankAccount

      const [year, month, day] = fields[0].split('-');
      const date = new Date(+year, +month - 1, +day)

      return {
        original: null,
        date : date,
        cost: Number(fields[5]?.replace(',', '.')) * 100,
        description : fields[2],
        bankAccount: bk,
        category: null
      } as TransactionItem;
    } else {
      // TODO to replace by chosen bank account from GUI
      const bk = {
        id : 21,
        category : "Commun",
        label: "CMB",
        sortedLabel: "Commun > CMB"
      } as BankAccount

      const [day, month, year] = fields[0]?.replace(/"/g, '').split('/');
      const date = new Date(+year, +month - 1, +day)

      const income = Number(fields[4]?.replace(/"/g, ''));
      const outcome = Number(fields[3]?.replace(/"/g, ''));

      return {
        original: null,
        date : date,
        cost: (income - outcome) * 100,
        description : fields[2]?.replace(/"/g, ''),
        bankAccount: bk,
        category: null
      } as TransactionItem;
    }
  }
}
