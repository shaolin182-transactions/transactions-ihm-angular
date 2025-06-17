import { AfterViewInit, Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { TransactionItem } from '../models/transaction-item';
import { ParseFileService } from '../services/parse-account-file/parse-file';
import { IParseAccountLineService } from '../services/parse-account-file/i-parse-account-line';
import { BoursoramaLineParserService } from '../services/parse-account-file/boursorama.service';
import { CmbLineParserService } from '../services/parse-account-file/cmb.service';

@Component({
  selector: 'app-import-result',
  templateUrl: './import-result.component.html',
  styleUrls: ['./import-result.component.css']
})
export class ImportResultComponent implements OnInit, AfterViewInit {

  transactions : TransactionItem[] = [];

  loading = false;

  constructor(private readonly parseFileService : ParseFileService, private readonly boursoramaLineParser : BoursoramaLineParserService, private readonly cmbLineParserService : CmbLineParserService) { }

  ngAfterViewInit(): void {
    this.loading = true;
    this.parseFileService.parse(this.determineLineParser())
      .pipe(finalize(() => this.loading = false))
      .subscribe(transaction =>  {
        this.transactions.push(transaction);
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.parseFileService.parse(this.determineLineParser())
      .pipe(finalize(() => this.loading = false))
      .subscribe(transaction =>  {
        this.transactions.push(transaction);
      });
  }

  determineLineParser(): IParseAccountLineService {
    if (this.parseFileService.accountType === "BOURSORAMA") {
      return this.boursoramaLineParser;
    } else {
      return this.cmbLineParserService;
    }
  }

}
