import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}

  processPayment(amount: number): Observable<{ success: boolean; message: string }> {
    // Simulate a delay for processing the payment
    return of({ success: true, message: 'Payment processed successfully!' }).pipe(delay(2000));
  }
}
