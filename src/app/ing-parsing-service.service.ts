import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount } from './models/bank-account';
import { TransactionItem } from './models/transaction-item';

@Injectable({
  providedIn: 'root'
})
export class IngParsingServiceService {

  fileContent: String;

  constructor() { }

  /**
   * Parse File Content from ING datasource
   * @returns a collection of TransactionItem
   */
  parse(file: File) : Observable<TransactionItem> {

    let fileReader = new FileReader();
    
    fileReader.readAsText(file);

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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
      label: "ING Direct"
    } as BankAccount

    return {
      original: null,
      date : fields[0],
      cost: Number(fields[3]?.replace(',', '.')) * 100,
      description : fields[1],
      bankAccount: bkIng,
      category: null
    } as TransactionItem;
  }
}
