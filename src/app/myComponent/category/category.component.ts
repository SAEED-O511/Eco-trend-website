import { Component, inject } from '@angular/core';


import { CategoryService } from '../../core/category.service';
import { RootObject } from '../../core/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  private readonly _CategoryService = inject(CategoryService);

 categoryList: RootObject[] = [];
 
 
  
  ngOnInit(): void {


    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data[0].name);
        this.categoryList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  

 
}
