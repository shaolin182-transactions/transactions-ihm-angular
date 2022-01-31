import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionslistComponent } from './transactionslist/transactionslist.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TransactionslistComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'transactions', component: TransactionslistComponent},
    ]),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
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
