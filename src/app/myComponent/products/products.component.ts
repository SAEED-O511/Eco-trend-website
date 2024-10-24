import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/products.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/search.pipe';
import { CartService } from '../../core/cart.service';
import { Products } from '../../core/products';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryComponent } from "../category/category.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, FormsModule, SearchPipe, HttpClientModule, CategoryComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // safeUrl1: any;
  // safeUrl2: any;

  // constructor(private sanitizer: DomSanitizer) {
  //   this.safeUrl1 = this.sanitizer.bypassSecurityTrustUrl('https://api.escuelajs.co/api/v1/products');
  // }
  text: string = '';
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  productList: Products[] = [];

  ngOnInit(): void {

    this._ProductsService.getPAllroduct().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // getImage(images: string[]): string {
  //   const image = images[0];
  //   return JSON.parse(image)[0];
  // }

  addToCart(product: Products): void {
    this._CartService.addProductToCart(product);
  }
  // addToCart(id:string):void {
  //   this._CartService.addProductToCart(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this._ToastrService.success(res.message)
  //       this._CartService.cartNumber = res.numOfCartItems



  //     },

  //   })
  // }
}

