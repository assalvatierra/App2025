import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiPaymentsService } from '../../../core/services/api-payments.service';
import { Payment, ReceivablePaymentLink, ExpensePaymentLink } from '../../../core/models/payment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {

  private paymentsSubject = new BehaviorSubject<Payment[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public payments$ = this.paymentsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  private baseUrl = 'http://localhost:5157';

  constructor(
    private apiPayments: ApiPaymentsService,
    private http: HttpClient
  ) { }

  /**
   * Get receivable payments for a payment
   */
  getReceivablePayments(paymentId: number): Observable<ReceivablePaymentLink[]> {
    return this.http.get<ReceivablePaymentLink[]>(`${this.baseUrl}/api/ReceivablePayments/byPayment/${paymentId}`);
  }

  /**
   * Add a receivable payment link
   */
  addReceivablePayment(receivablePayment: ReceivablePaymentLink): Observable<ReceivablePaymentLink> {
    return this.http.post<ReceivablePaymentLink>(`${this.baseUrl}/api/ReceivablePayments`, receivablePayment);
  }

  /**
   * Update a receivable payment link
   */
  updateReceivablePayment(id: number, receivablePayment: ReceivablePaymentLink): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/ReceivablePayments/${id}`, receivablePayment);
  }

  /**
   * Delete a receivable payment link
   */
  deleteReceivablePayment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/ReceivablePayments/${id}`);
  }

  /**
   * Get expense payments for a payment
   */
  getExpensePayments(paymentId: number): Observable<ExpensePaymentLink[]> {
    return this.http.get<ExpensePaymentLink[]>(`${this.baseUrl}/api/ExpensePayments/byPayment/${paymentId}`);
  }

  /**
   * Add an expense payment link
   */
  addExpensePayment(expensePayment: ExpensePaymentLink): Observable<ExpensePaymentLink> {
    return this.http.post<ExpensePaymentLink>(`${this.baseUrl}/api/ExpensePayments`, expensePayment);
  }

  /**
   * Update an expense payment link
   */
  updateExpensePayment(id: number, expensePayment: ExpensePaymentLink): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/ExpensePayments/${id}`, expensePayment);
  }

  /**
   * Delete an expense payment link
   */
  deleteExpensePayment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/ExpensePayments/${id}`);
  }

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
