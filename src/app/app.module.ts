import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { TransactionslistComponent } from './transactionslist/transactionslist.component';
import { HomeComponent } from './home/home.component'
import { SharedModule } from './shared/shared.module'
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CostComponent } from './transactionslist/cost/cost.component';
import { CategoryComponent } from './transactionslist/category/category.component';
import { BankAccountComponent } from './transactionslist/bank-account/bank-account.component';

registerLocaleData(localeFr);


@NgModule({
  declarations: [
    AppComponent,
    TransactionslistComponent,
    HomeComponent,
    CostComponent,
    CategoryComponent,
    BankAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    OAuthModule.forRoot({
        resourceServer: {
            allowedUrls: ['http://localhost:8080/transactions'],
            sendAccessToken: true
        }
    })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
