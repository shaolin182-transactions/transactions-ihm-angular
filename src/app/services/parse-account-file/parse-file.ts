import { Observable } from "rxjs/internal/Observable";
import { TransactionItem } from "src/app/models/transaction-item";
import { IParseAccountLineService } from "./i-parse-account-line";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ParseFileService {

  /**
   * CSV File to parse from external source
   */
  #_file: File;

  #accountType: string;

  public get file(): File {
    return this.#_file;
  }
  public set file(value: File) {
    this.#_file = value;
  }
  
  public get accountType(): string {
    return this.#accountType;
  }
  public set accountType(value: string) {
    this.#accountType = value;
  }

  /**
   * Parse File Content from external datasource
   * @returns a collection of TransactionItem
  */
  parse(lineParser : IParseAccountLineService) : Observable<TransactionItem> {
    if (this.file != undefined){
      let fileReader = new FileReader();
    
      fileReader.readAsText(this.file);

      // Return an observable that emits each transaction item parsed from the file
      // and completes when the file has been fully read
      return new Observable<TransactionItem>(observer => {

        fileReader.onload = (e) => {
          // Get file Content
          const fileContent = fileReader.result as string;
          const lines:string[] = this.getContentLines(fileContent);

          for (let line in lines){
            observer.next(lineParser.buildTransaction(lines[line]))
          }  
    
          observer.complete()
        }   
        
      })
    }
  } 

  /**
   * Split file content into lines
   * @param fileContent file content as a string
   * @returns a string array containing each line of the file
   */
  getContentLines(fileContent: string): string[] {
    let lines = fileContent.split(/\r?\n/);

    // Remove empty lines
    lines = lines.filter(line => line.trim() !== '');
    return lines;
  }
}