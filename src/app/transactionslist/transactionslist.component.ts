import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service'
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transactionslist',
  templateUrl: './transactionslist.component.html',
  styleUrls: ['./transactionslist.component.css']
})
export class TransactionslistComponent implements OnInit {

  transactions : Transaction[];

  displayedColumns: string[] = ['id', 'date', 'description', 'cost'];

  constructor(private transactionsService : TransactionsService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() : void {
    this.transactions = this.transactionsService.getTransactions();
  }

}
