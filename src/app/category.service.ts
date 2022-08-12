import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransactionCategory } from './models/transaction-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() : Observable<TransactionCategory[]> {
    return this.http.get<TransactionCategory[]>(environment.categoriesUrl);
  }
}
