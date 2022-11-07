import { Component, Input, OnInit} from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionCategory } from 'src/app/models/transaction-category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Map<String, TransactionCategory[]>;

  constructor(private categoryService : CategoryService){}

  ngOnInit(): void {
    if (this.category){
      this.category.sortedLabel = this.category?.category + " > " + this.category?.label
    }
    // this.getCategories();
  }

  /* getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = this.transformCategories(categories));
  } */

  /**
   * Transform categories in an correft format for select datasource
   * @param categories : Categories from server
   */
   /* transformCategories(categories : TransactionCategory[]) : Map<String, TransactionCategory[]> {
    
    let result:Map<String, TransactionCategory[]> = new Map<String, TransactionCategory[]>();

    for (let category of categories){
      let mainCategory = category.category;
      if (result.has(mainCategory)){
        result.get(mainCategory).push(category)  
      } else {
        result.set(mainCategory, [category]);
      }
    }    
    return result
  } */

  @Input() category:TransactionCategory;

  @Input() readOnly:Boolean = true;

}
