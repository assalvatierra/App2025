import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPaymentsService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  /**
   * Get all payments
   */
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/api/Payments`).pipe(
      map((res: any) => res.map((p: any) => this.mapPayment(p)))
    );
  }

  /**
   * Get payments filtered by entity ID
   */
  getPaymentsByEntity(entityId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/api/Payments/byEntity/${entityId}`).pipe(
      map((res: any) => res.map((p: any) => this.mapPayment(p)))
    );
  }

  /**
   * Get a single payment by ID
   */
  getPayment(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/api/Payments/${id}`).pipe(
      map((p: any) => this.mapPayment(p))
    );
  }

  /**
   * Create a new payment
   */
  addPayment(payment: Payment): Observable<Payment> {
    // Sanitize payment object before sending to prevent validation errors
    const sanitizedPayment = {
      ...payment,
      // Ensure required fields have valid values
      remarks: payment.remarks || '',                    // Backend requires non-null Remarks
      trxDate: payment.trxDate || new Date(),           // Ensure date is set
      amount: payment.amount || 0,                       // Ensure amount is set
      
      // Set default values for boolean fields
      isArchived: payment.isArchived ?? false,
      isPrivate: payment.isPrivate ?? false,
      isActive: payment.isActive ?? true,                // Default new payments to active
      
      // Remove server-managed fields (these are set by the backend)
      id: undefined,
      createdBy: undefined,
      createdOn: undefined,
      lastEditBy: undefined,
      lastEditOn: undefined,
      
      // Clean up navigation properties for POST
      receivablePayments: payment.receivablePayments?.map(rp => ({
        receivablesId: rp.receivablesId,
        paymentsId: undefined  // Will be set by server after save
      })),
      expensePayments: payment.expensePayments?.map(ep => ({
        expensesId: ep.expensesId,
        paymentsId: undefined  // Will be set by server after save
      }))
    };

    return this.http.post<Payment>(`${this.baseUrl}/api/Payments`, sanitizedPayment).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding payment:', error);
        
        // Log validation errors for debugging
        if (error.status === 400 && error.error?.errors) {
          console.error('Validation errors:', error.error.errors);
        }
        
        return throwError(() => ({
          status: error.status,
          message: error.error?.title || error.message || 'Failed to add payment',
          errors: error.error?.errors || {}
        }));
      })
    );
  }

  /**
   * Update an existing payment
   */
  updatePayment(id: number, payment: Payment): Observable<any> {
    // Sanitize payment object before sending
    const sanitizedPayment = {
      ...payment,
      remarks: payment.remarks || '',
      // Don't allow changing createdBy/createdOn, only lastEditBy/lastEditOn
      createdBy: undefined,
      createdOn: undefined,
      lastEditBy: undefined,
      lastEditOn: undefined
    };

    return this.http.put<any>(`${this.baseUrl}/api/Payments/${id}`, sanitizedPayment).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating payment:', error);
        
        if (error.status === 400 && error.error?.errors) {
          console.error('Validation errors:', error.error.errors);
        }
        
        return throwError(() => ({
          status: error.status,
          message: error.error?.title || error.message || 'Failed to update payment',
          errors: error.error?.errors || {}
        }));
      })
    );
  }

  /**
   * Delete a payment
   */
  deletePayment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Payments/${id}`);
  }

  /**
   * Archive a payment
   */
  archivePayment(id: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/Payments/${id}/archive`, {});
  }

  /**
   * Activate a payment
   */
  activatePayment(id: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/Payments/${id}/activate`, {});
  }

  /**
   * Map raw API response to Payment model
   */
  private mapPayment(data: any): Payment {
    return {
      id:                 data.id,
      trxDate:            data.trxDate,
      amount:             data.amount,
      remarks:            data.remarks ?? '',
      createdBy:          data.createdBy,
      createdOn:          data.createdOn,
      lastEditBy:         data.lastEditBy,
      lastEditOn:         data.lastEditOn,
      isArchived:         data.isArchived,
      isPrivate:          data.isPrivate,
      isActive:           data.isActive,
      entityId:           data.entityId,
      itemTypeId:         data.itemTypeId,
      itemStatusId:       data.itemStatusId,
      additionalInfo:     data.additionalInfo,
      receivablePayments: data.receivablePayments,
      expensePayments:    data.expensePayments
    };
  }
}
