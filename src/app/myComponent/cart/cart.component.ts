import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../core/cart.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  cartItemCount: number = 0;
  totalAmount: number = 0;
  private subscription!: Subscription;

  constructor(private cartService: CartService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalAmount();
    this.subscription = this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
      this.calculateTotalAmount();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  incrementQuantity(item: any): void {
    item.quantity++;
    this.cartService.updateCartItem(item); // Use a new method to update the item
    this.calculateTotalAmount();
  }

  decrementQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item); // Use a new method to update the item
    } else {
      this.removeItem(item);
    }
    this.calculateTotalAmount();
  }

  removeItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartService.removeCartItem(item); // Use a new method to remove the item
    }
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  trackByFn(index: number, item: any): number {
    return item.id; // Replace 'id' with the unique identifier property of your items
  }
}
