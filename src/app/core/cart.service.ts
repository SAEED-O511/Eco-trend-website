import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Products[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  addProductToCart(product: Products): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.updateCartItemCount();
  }

  updateCartItem(product: Products): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = product.quantity;
    }
    this.updateCartItemCount();
  }

  removeCartItem(product: Products): void {
    const index = this.cartItems.indexOf(product);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.updateCartItemCount();
  }

  getCartItems(): Products[] {
    return this.cartItems;
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartItemCount();
  }

  private updateCartItemCount(): void {
    const count = this.cartItems.reduce((total, product) => total + product.quantity, 0);
    this.cartItemCount.next(count);
  }
}
