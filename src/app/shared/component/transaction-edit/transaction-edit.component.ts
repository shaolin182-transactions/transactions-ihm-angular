import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { TransactionCategory } from '../../../models/transaction-category';
import { TransactionItem } from '../../../models/transaction-item';
import { TransactionsService } from '../../../services/transactions.service';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { BankAccount } from '../../../models/bank-account';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit, AfterViewInit {

  @Input() transaction:TransactionItem;

  @Input()
  isOpen: Boolean;

  categories: Map<String, TransactionCategory[]>;

  bankAccounts: Map<String, BankAccount[]>;

  constructor(public categoryService : CategoryService, public transactionService: TransactionsService, public bankAccountService : BankAccountService, public alertifyService: AlertifyService){}

  ngAfterViewInit(): void {
    this.getCategories();
    this.getBankAccounts();
  }


  ngOnInit(): void {
    /* this.getCategories();
    this.getBankAccounts(); */
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = this.transformCategories(categories));
  }

  getBankAccounts() {
    this.bankAccountService.getBankAccounts()
      .subscribe(accounts => this.bankAccounts = this.transformBankAccount(accounts));
  }

  /**
   * Transform bankAccounts in an correct format for select datasource
   * @param bankAccounts : Bank Accounts from server
   */
   transformBankAccount(bankAccounts : BankAccount[]) : Map<String, BankAccount[]> {

    let result:Map<String, BankAccount[]> = new Map<String, BankAccount[]>();

    for (let bankAccount of bankAccounts){
      let mainCategory = bankAccount.category;
      if (result.has(mainCategory)){
        result.get(mainCategory).push(bankAccount)
      } else {
        result.set(mainCategory, [bankAccount]);
      }
    }
    return result
  }

  /**
   * Transform categories in an correft format for select datasource
   * @param categories : Categories from server
   */
   transformCategories(categories : TransactionCategory[]) : Map<String, TransactionCategory[]> {

    let result:Map<String, TransactionCategory[]> = new Map<String, TransactionCategory[]>();

    for (let category of categories){
      let mainCategory = category.category;
      if (result.has(mainCategory)){
        result.get(mainCategory).push(category)
      } else {
        result.set(mainCategory, [category]);
      }
    }
    return result
  }

  compareCategory(cat1: TransactionCategory, cat2: TransactionCategory) {
    /* if (cat1 && cat2) {
      console.log( cat1.id == cat2.id);
      return cat1.id == cat2.id;
    } else {
      return false;
    } */
    return cat1 && cat2 ? cat1.id == cat2.id : false;
  }

  compareBankAccount(bk1: BankAccount, bk2: BankAccount) {
    return bk1 && bk2 ? bk1.id == bk2.id : false;
  }

  public openFn() {
    this.isOpen = true;
  }

  closeFn() {
    this.isOpen = false;
  }

  saveOrEdit() {
    console.log("addorEdit")
    if (this.transaction.original){
      this.transactionService.putTransaction(this.transaction)
        .subscribe(
          transaction => this.transaction = transaction,
          error => this.alertifyService.error(`Error when updating transactions : ${error.message}`));
    } else {
      this.transactionService.addTransaction(this.transaction)
        .subscribe(
          transaction => this.transaction = transaction,
          error => this.alertifyService.error(`Error when saving transactions : ${error.message}`));
    }
  }
}
