import { Component, ElementRef, ViewChild } from '@angular/core';
import { IngParsingServiceService } from '../services/ing-parsing-service.service';
import { TransactionItem } from '../models/transaction-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-importfile',
  templateUrl: './importfile.component.html',
  styleUrls: ['./importfile.component.css']
})
export class ImportfileComponent {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  
  transactions : TransactionItem[] = [];
  accountType:String;
  headers = false;

  constructor(private ingParsingService : IngParsingServiceService, private route:Router) { }


  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
   prepareFilesList(files: Array<any>) {
    for (const item of files) {
      this.files.push(item);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
   formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
   deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  parse() {
    this.ingParsingService.file = this.files[0];
    this.ingParsingService.accountType = this.accountType,
    this.route.navigate(['/import-result'])
    
  }



}
