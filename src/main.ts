import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { APP_CONFIG } from './app/models/app-config';
import { environment } from './environments/environment';


fetch('/assets/environments/config.json')
  .then((response) => response.json())
  .then((config) => {
    if (config.production) {
      enableProdMode()
    }

    environment['sendTokenUrl'] = config.transactionsUrl;
 
    platformBrowserDynamic([{ provide: APP_CONFIG, useValue: config }])
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err))
  })


