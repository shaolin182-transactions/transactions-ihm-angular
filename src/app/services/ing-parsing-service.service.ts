import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount } from '../models/bank-account';
import { TransactionItem } from '../models/transaction-item';

@Injectable({
  providedIn: 'root'
})
export class IngParsingServiceService {

  fileContent: String;

  private _file: File;

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

    console.log("Build new transaction : " + line)
    const fields = line.split(';');

    // TODO to replace by chosen bank account from GUI
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
  }
}
