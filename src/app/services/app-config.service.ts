import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  private readonly CONFIG_URL = 'assets/environments/environment.json';
  private configuration: AppConfig;
  loaded = false;

  constructor(private http: HttpClient) {
  }

  public loadConfig(): any {
    return this.http
          .get<AppConfig>(this.CONFIG_URL)
          .toPromise()
          .then(data => {
              this.configuration = data;
              this.loaded = true;
          });
   
  }

  getConfig(): AppConfig {
    return this.configuration;
}
}
