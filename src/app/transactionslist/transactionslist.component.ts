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
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
  }

  sortingDataAccessor: ((data: TransactionItem, sortHeaderId: string) => string | number) =
    (data: TransactionItem, sortHeaderId: string): string | number => {
      let value = null;
      if (sortHeaderId.indexOf('.') !== -1) {
        const ids = sortHeaderId.split('.');
        if (data && data[ids[0]]){
          value = data[ids[0]][ids[1]];
        }
      } else {
        value = data[sortHeaderId];
      }
      return value;
    }


  displayedColumns: string[] = ['date', 'description', 'bankAccount.sortedLabel', 'category.sortedLabel', 'cost'];

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
