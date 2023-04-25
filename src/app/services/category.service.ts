import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/assets/environments/environment';
import { TransactionCategory } from '../models/transaction-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() : Observable<TransactionCategory[]> {
    return this.http.get<TransactionCategory[]>(environment.categoriesUrl)
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
