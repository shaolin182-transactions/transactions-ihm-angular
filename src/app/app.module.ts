import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionslistComponent } from './transactionslist/transactionslist.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    TransactionslistComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'home', component: HomeComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'transactions', component: TransactionslistComponent},
    ]),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
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
