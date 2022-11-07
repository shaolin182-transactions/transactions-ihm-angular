import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { ImportResultComponent } from './import-result/import-result.component';
import { ImportfileComponent } from './importfile/importfile.component';
import { TransactionsComponent } from './transactions/transactions.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'transactions', component: TransactionsComponent},
  { path: 'import', component: ImportfileComponent},
  { path: 'import-result', component: ImportResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
