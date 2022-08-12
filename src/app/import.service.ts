import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Transaction } from './models/transaction';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  
  constructor(private http: HttpClient) { }

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
    // return this.http.post<Transaction[]>(environment.transactionsUrl, file);
  }
}
