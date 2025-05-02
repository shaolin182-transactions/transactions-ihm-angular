import { getLocaleFirstDayOfWeek } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { TransactionItem } from '../models/transaction-item';
import { IngParsingServiceService } from '../services/ing-parsing-service.service';

@Component({
  selector: 'app-import-result',
  templateUrl: './import-result.component.html',
  styleUrls: ['./import-result.component.css']
})
export class ImportResultComponent implements OnInit, AfterViewInit {

  transactions : TransactionItem[] = [];

  loading = false;

  constructor(private ingParsingService : IngParsingServiceService) { }

  // TODO : Delete reference to INGParsingService it should be any instance of a parsing service
  ngAfterViewInit(): void {
    console.log("After view INit import -resut");
    this.loading = true;
    this.ingParsingService.parse()
      .pipe(finalize(() => this.loading = false))
      .subscribe(transaction =>  {
        this.transactions.push(transaction);
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.ingParsingService.parse()
      .pipe(finalize(() => this.loading = false))
      .subscribe(transaction =>  {
        this.transactions.push(transaction);
      });
  }

}
