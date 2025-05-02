import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TransactionCategory } from '../models/transaction-category';
import { APP_CONFIG, AppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) public config: AppConfig) { }

  getCategories() : Observable<TransactionCategory[]> {
    return this.http.get<TransactionCategory[]>(this.config.categoriesUrl)
    .pipe(
      map(data => this.mapCategories(data))
    );
  }

  mapCategories(data: TransactionCategory[]): TransactionCategory[] {
    return data.map( item => this.mapCategory(item) )
  }

  mapCategory(item: TransactionCategory): any {
    item.sortedLabel = item.category + " > " + item.label;
    return item;
  }
}
