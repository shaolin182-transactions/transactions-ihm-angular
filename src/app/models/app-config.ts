import { InjectionToken } from "@angular/core";

export class AppConfig {
  
  production: Boolean; 
  transactionsUrl: string;
  transactionsUrlGet: string;
  keyCloakUrl: string;
  discoveryUrl: string;
  categoriesUrl: string;
  bankAccountUrl: string;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG')
  