import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { TransactionItem } from '../models/transaction-item';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-transactionslist',
  templateUrl: './transactionslist.component.html',
  styleUrls: ['./transactionslist.component.css']
})
export class TransactionslistComponent implements OnInit {

  loading = false;

  transactions : TransactionItem[] = [];

  dataSource = new MatTableDataSource(this.transactions);


  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
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
    this.loading = true;
    this.transactionsService.getTransactions()
      .pipe(finalize(() => this.loading = false))
      .subscribe(transactions => this.dataSource.data = transactions);
  }
}
