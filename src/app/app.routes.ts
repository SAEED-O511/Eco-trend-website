import { CategoryComponent } from './myComponent/category/category.component';
import { Routes } from '@angular/router';

export const routes: Routes = [ { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./myComponent/home/home.component').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./myComponent/products/products.component').then(m => m.ProductsComponent) },
  { path: 'category', loadComponent: () => import('./myComponent/category/category.component').then(m => m.CategoryComponent) },
  { path: 'about', loadComponent: () => import('./myComponent/about/about.component').then(m => m.AboutComponent) },
  { path: 'cart', loadComponent: () => import('./myComponent/cart/cart.component').then(m => m.CartComponent) },

  { path: 'login', loadComponent: () => import('./myComponent/log-in/log-in.component').then(m => m.LogInComponent) },
  { path: 'footer', loadComponent: () => import('./myComponent/footer/footer.component').then(m => m.FooterComponent) },
  { path: 'payment', loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent) },

  { path: '**', loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent) }



];
