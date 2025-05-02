import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class ImportService {


  importTransactionsFile(filename: String, file: File) : Observable<Transaction[]> {
    console.log("Call Import service")
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // Get file Content
      let content = fileReader.result;
      
      // Parse file content
      // Create transactions
      console.log(fileReader.result);
    }
    fileReader.readAsText(file);
    return null;
  }
}
