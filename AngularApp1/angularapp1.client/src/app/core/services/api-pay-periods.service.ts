import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PayPeriod } from '../models/pay-period.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPayPeriodsService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  /**
   * Get all pay periods or filter by isActive, dateFrom, dateTo, and/or itemStatusId
   * @param isActive Optional active status filter
   * @param dateFrom Optional date from filter
   * @param dateTo Optional date to filter
   * @param itemStatusId Optional item status ID filter
   * @returns Observable of PayPeriod array
   */
  getPayPeriods(isActive?: boolean, dateFrom?: Date, dateTo?: Date, itemStatusId?: number): Observable<PayPeriod[]> {
    let params = new HttpParams();

    if (isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }

    if (dateFrom) {
      params = params.set('dateFrom', dateFrom.toISOString().split('T')[0]);
    }

    if (dateTo) {
      params = params.set('dateTo', dateTo.toISOString().split('T')[0]);
    }

    if (itemStatusId) {
      params = params.set('itemStatusId', itemStatusId.toString());
    }

    return this.http.get<PayPeriod[]>(`${this.baseUrl}/api/PayPeriods`, { params }).pipe(
      map((res: any) => {
        return res.map((payPeriod: any) => this.mapPayPeriod(payPeriod));
      })
    );
  }

  /**
   * Get a single pay period by ID
   * @param id Pay period ID
   * @returns Observable of PayPeriod
   */
  getPayPeriod(id: number): Observable<PayPeriod> {
    return this.http.get<PayPeriod>(`${this.baseUrl}/api/PayPeriods/${id}`).pipe(
      map((payPeriod: any) => this.mapPayPeriod(payPeriod))
    );
  }

  /**
   * Get the current active pay period
   * @returns Observable of PayPeriod
   */
  getCurrentPayPeriod(): Observable<PayPeriod> {
    return this.http.get<PayPeriod>(`${this.baseUrl}/api/PayPeriods/Current`).pipe(
      map((payPeriod: any) => this.mapPayPeriod(payPeriod))
    );
  }

  /**
   * Get pay period by a specific date
   * @param date Date to find pay period for
   * @returns Observable of PayPeriod
   */
  getPayPeriodByDate(date: Date): Observable<PayPeriod> {
    const dateStr = date.toISOString().split('T')[0];
    return this.http.get<PayPeriod>(`${this.baseUrl}/api/PayPeriods/ByDate/${dateStr}`).pipe(
      map((payPeriod: any) => this.mapPayPeriod(payPeriod))
    );
  }

  /**
   * Add a new pay period
   * @param payPeriod PayPeriod object
   * @returns Observable of created PayPeriod
   */
  addPayPeriod(payPeriod: PayPeriod): Observable<PayPeriod> {
    return this.http.post<PayPeriod>(`${this.baseUrl}/api/PayPeriods`, payPeriod).pipe(
      map((payPeriod: any) => this.mapPayPeriod(payPeriod))
    );
  }

  /**
   * Update an existing pay period
   * @param id Pay period ID
   * @param payPeriod Updated PayPeriod object
   * @returns Observable of any
   */
  updatePayPeriod(id: number, payPeriod: PayPeriod): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/PayPeriods/${id}`, payPeriod);
  }

  /**
   * Delete a pay period
   * @param id Pay period ID
   * @returns Observable of any
   */
  deletePayPeriod(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/PayPeriods/${id}`);
  }

  /**
   * Helper method to map API response to PayPeriod model
   * @param data Raw API data
   * @returns Mapped PayPeriod object
   */
  private mapPayPeriod(data: any): PayPeriod {
    return {
      id: data.id,
      createdBy: data.createdBy,
      createdOn: new Date(data.createdOn),
      lastEditBy: data.lastEditBy,
      lastEditOn: new Date(data.lastEditOn),
      isArchived: data.isArchived,
      isPrivate: data.isPrivate,
      isActive: data.isActive,
      dateFrom: new Date(data.dateFrom),
      dateTo: new Date(data.dateTo),
      notes: data.notes,
      payDate: new Date(data.payDate),
      itemStatusId: data.itemStatusId
    };
  }
}
