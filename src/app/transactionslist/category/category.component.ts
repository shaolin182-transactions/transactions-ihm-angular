import { Component, Input, OnInit} from '@angular/core';
import { TransactionCategory } from 'src/app/models/transaction-category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  ngOnInit(): void {
    if (this.category){
      this.category.sortedLabel = this.category?.category + " > " + this.category?.label
    }
  }

  @Input() category:TransactionCategory;

}
