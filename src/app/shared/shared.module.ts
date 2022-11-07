import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material.module';

import { HeaderComponent } from './component/header/header.component';
import { TransactionsListComponent } from './component/transactions-list/transactions-list.component'
import { TransactionEditComponent } from './component/transaction-edit/transaction-edit.component';
import { BankAccountComponent } from '../transactions/bank-account/bank-account.component';
import { CategoryComponent } from './component/category/category.component';
import { CostComponent } from './component/cost/cost.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    HeaderComponent,
    TransactionsListComponent, 
    TransactionEditComponent, 
    BankAccountComponent, 
    CategoryComponent,
    CostComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule, 
    FormsModule,
    FlexLayoutModule
  ],
  exports: [
    HeaderComponent,
    MaterialModule,
    AppRoutingModule, 
    TransactionsListComponent, 
    TransactionEditComponent, 
    BankAccountComponent,
    CategoryComponent,
    CostComponent
  ]
})
export class SharedModule { }
