import { Component, Input, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/models/bank-account';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  ngOnInit(): void {
    this.bankAccount.sortedLabel = this.bankAccount.category + " > " + this.bankAccount.label
  }

  @Input() bankAccount:BankAccount;

}
