import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionItem } from 'src/app/models/transaction-item';
import { EditFormService } from 'src/app/services/edit-form.service';
import { TransactionEditComponent } from 'src/app/shared/component/transaction-edit/transaction-edit.component';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit, AfterViewInit {

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('transactions')
  private _transactions: TransactionItem[] = [];

  public get transactions(): TransactionItem[] {
    return this._transactions;
  }
  public set transactions(value: TransactionItem[]) {
    console.log("setter");
    this._transactions = value;
    this.dataSource.data = value;
  }

  selectedTransaction :  TransactionItem;

  isOpen: Boolean = false;

  dataSource = new MatTableDataSource<TransactionItem>();

  private _editFormDom: TransactionEditComponent;
  
  constructor(private editForm: EditFormService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TransactionItem>(this.transactions);
  }

  @ViewChild(TransactionEditComponent)  set editFormDom(editFormDom : TransactionEditComponent) {
    if (editFormDom){
      this._editFormDom = editFormDom;
      this.editForm.setForm(this._editFormDom);
    }
  };

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


  ngAfterViewInit(): void {
    this.editForm.setForm(this._editFormDom);
  }

  displayEditForm(item:TransactionItem): void {
    console.log("test");
    this.selectedTransaction = item;
    this.isOpen = true;
    this.editForm.open();
  }

}
