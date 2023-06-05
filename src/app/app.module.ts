import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HomeComponent } from './home/home.component'
import { SharedModule } from './shared/shared.module'
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ImportfileComponent } from './importfile/importfile.component';
import { DraganddropDirective } from './draganddrop.directive';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImportResultComponent } from './import-result/import-result.component';
import { environment } from 'src/environments/environment';

registerLocaleData(localeFr);


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    HomeComponent,
    ImportfileComponent,
    DraganddropDirective,
    ImportResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    OAuthModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: OAuthModuleConfig,
      useFactory: () => ({
        resourceServer: {
          allowedUrls: [environment['sendTokenUrl']],
          sendAccessToken: true
        }
      })
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
