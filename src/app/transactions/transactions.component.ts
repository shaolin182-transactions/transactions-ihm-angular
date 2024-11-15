import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { TransactionItem } from '../models/transaction-item';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { finalize } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';


@Component({
  selector: 'app-transactionslist',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  loading = false;

  transactions : TransactionItem[] = [];


  constructor(private transactionsService : TransactionsService, private alertifyService: AlertifyService) { }
  ngAfterViewInit(): void {
    this.getTransactions();
  }


  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() : void {
    this.loading = true;
    this.transactionsService.getTransactions()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        transactions => this.transactions = transactions,
        error => this.alertifyService.error(`Error when getting transactions : ${error.message}`)
      );
  }
}
