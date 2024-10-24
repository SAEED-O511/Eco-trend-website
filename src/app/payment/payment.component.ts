import { Component } from '@angular/core';
import { PaymentService } from '../payment.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  amount: number = 0;
  message: string = '';
  loading: boolean = false;

  constructor(private paymentService: PaymentService) {}

  submitPayment() {
    this.loading = true;
    this.paymentService.processPayment(this.amount).subscribe((response) => {
      this.loading = false;
      this.message = response.message;
    });
  }


}
