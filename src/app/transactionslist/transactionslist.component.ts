import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { TransactionItem } from '../models/transaction-item';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-transactionslist',
  templateUrl: './transactionslist.component.html',
  styleUrls: ['./transactionslist.component.css']
})
export class TransactionslistComponent implements OnInit, AfterViewInit {

  transactions : TransactionItem[] = [];

  dataSource = new MatTableDataSource(this.transactions);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  displayedColumns: string[] = ['date', 'description', 'bankaccount', 'category', 'cost'];

  constructor(
    private transactionsService : TransactionsService) {

    }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() : void {
    this.transactionsService.getTransactions()
      .subscribe(transactions => this.dataSource.data = transactions);
  }
}
