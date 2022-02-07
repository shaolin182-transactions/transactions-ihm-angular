import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { TransactionslistComponent } from './transactionslist/transactionslist.component';
import { HomeComponent } from './home/home.component'
import { SharedModule } from './shared/shared.module'


@NgModule({
  declarations: [
    AppComponent,
    TransactionslistComponent,
    HomeComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
