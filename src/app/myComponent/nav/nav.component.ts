import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  useIcon: boolean = true;
  private subscription!: Subscription; // Use non-null assertion operator

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  navigate() {
    this.router.navigateByUrl('/payment');
  }
  
  isNavbarCollapsed = true;

  // Toggle the navbar between collapsed and expanded states
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // Close the navbar after clicking a link
  closeNavbar() {
    this.isNavbarCollapsed = true;
  }
}
