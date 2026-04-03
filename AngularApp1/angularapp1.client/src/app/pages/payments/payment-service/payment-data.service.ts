import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiPaymentsService } from '../../../core/services/api-payments.service';
import { Payment } from '../../../core/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {

  private paymentsSubject = new BehaviorSubject<Payment[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public payments$ = this.paymentsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiPayments: ApiPaymentsService) { }

  /**
   * Load all payments
   */
  loadPayments(): void {
    this.loadingSubject.next(true);
    this.apiPayments.getPayments().subscribe({
      next: (res) => {
        this.paymentsSubject.next(res || []);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Error loading payments:', err);
        this.loadingSubject.next(false);
      }
    });
  }

  /**
   * Load payments filtered by entity ID
   */
  loadPaymentsByEntity(entityId: number): void {
    this.loadingSubject.next(true);
    this.apiPayments.getPaymentsByEntity(entityId).subscribe({
      next: (res) => {
        this.paymentsSubject.next(res || []);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Error loading payments by entity:', err);
        this.loadingSubject.next(false);
      }
    });
  }

  /**
   * Load a single payment by ID
   */
  loadPayment(id: number): Observable<Payment> {
    this.loadingSubject.next(true);
    return this.apiPayments.getPayment(id).pipe(
      tap({
        next: () => this.loadingSubject.next(false),
        error: (err) => {
          console.error('Error loading payment:', err);
          this.loadingSubject.next(false);
        }
      })
    );
  }

  /**
   * Add a new payment
   */
  addPayment(payment: Payment): Observable<Payment> {
    return this.apiPayments.addPayment(payment);
  }

  /**
   * Update an existing payment
   */
  updatePayment(id: number, payment: Payment): Observable<any> {
    return this.apiPayments.updatePayment(id, payment).pipe(
      tap({ error: (err) => console.error('Error updating payment:', err) })
    );
  }

  /**
   * Delete a payment
   */
  deletePayment(id: number): Observable<any> {
    return this.apiPayments.deletePayment(id).pipe(
      tap({ error: (err) => console.error('Error deleting payment:', err) })
    );
  }

  /**
   * Archive a payment
   */
  archivePayment(id: number): Observable<any> {
    return this.apiPayments.archivePayment(id).pipe(
      tap({ error: (err) => console.error('Error archiving payment:', err) })
    );
  }

  /**
   * Activate a payment
   */
  activatePayment(id: number): Observable<any> {
    return this.apiPayments.activatePayment(id).pipe(
      tap({ error: (err) => console.error('Error activating payment:', err) })
    );
  }
}
