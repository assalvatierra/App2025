import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PayPeriod } from '../models/pay-period.model';
import { PayExpense } from '../models/pay-expense.model';
import { Timesheet } from '../models/timesheet.model';
import { PayAddition } from '../models/pay-addition.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPayPeriodsService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  /**
   * Get all pay periods or filter by isActive, dateFrom, dateTo, itemStatusId, and/or itemTypeId
   * @param isActive Optional active status filter
   * @param dateFrom Optional date from filter
   * @param dateTo Optional date to filter
   * @param itemStatusId Optional item status ID filter
   * @param itemTypeId Optional item type ID filter
   * @returns Observable of PayPeriod array
   */
  getPayPeriods(isActive?: boolean, dateFrom?: Date, dateTo?: Date, itemStatusId?: number, itemTypeId?: number): Observable<PayPeriod[]> {
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

    if (itemTypeId) {
      params = params.set('itemTypeId', itemTypeId.toString());
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
   * Get expenses linked to a pay period
   * @param id Pay period ID
   * @returns Observable of PayExpense array
   */
  getPayPeriodExpenses(id: number): Observable<PayExpense[]> {
    return this.http.get<PayExpense[]>(`${this.baseUrl}/api/PayPeriods/${id}/Expenses`).pipe(
      map((res: any) => {
        return res.map((expense: any) => this.mapPayExpense(expense));
      })
    );
  }

  /**
   * Get timesheets linked to a pay period
   * @param id Pay period ID
   * @returns Observable of Timesheet array
   */
  getPayPeriodTimesheets(id: number): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${this.baseUrl}/api/PayPeriods/${id}/Timesheets`).pipe(
      map((res: any) => {
        return res.map((timesheet: any) => this.mapTimesheet(timesheet));
      })
    );
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
      itemStatusId: data.itemStatusId,
      itemTypeId: data.itemTypeId,
      itemType: data.itemType
    };
  }

  /**
   * Helper method to map API response to PayExpense model
   * @param data Raw API data
   * @returns Mapped PayExpense object
   */
  private mapPayExpense(data: any): PayExpense {
    return {
      id: data.id,
      expenseId: data.expenseId,
      trxDate: new Date(data.trxDate),
      amount: data.amount,
      remarks: data.remarks,
      trxRef: data.trxRef,
      itemTypeId: data.itemTypeId,
      isActive: data.isActive,
      isArchived: data.isArchived
    };
  }

  /**
   * Helper method to map API response to Timesheet model
   * @param data Raw API data
   * @returns Mapped Timesheet object
   */
  private mapTimesheet(data: any): Timesheet {
    return {
      id: data.id,
      tsDate: new Date(data.tsDate),
      remarks: data.remarks,
      resourceId: data.resourceId,
      resourceId1: data.resourceId1,
      itemStatusId: data.itemStatusId,
      payPeriodId: data.payPeriodId,
      resource: data.resourceName ? {
        id: data.resourceId,
        name: data.resourceName,
        code: data.resourceCode
      } as any : undefined,
      resourceId1Navigation: data.resourceId1Name ? {
        id: data.resourceId1,
        name: data.resourceId1Name,
        code: data.resourceId1Code
      } as any : undefined,
      timesheetExpenseDetail: data.timesheetExpenseDetail ? {
        id: data.timesheetExpenseDetail.id,
        billAmount: data.timesheetExpenseDetail.billAmount,
        additionalBillAmount: data.timesheetExpenseDetail.additionalBillAmount,
        resourceRate: data.timesheetExpenseDetail.resourceRate,
        additionalRate: data.timesheetExpenseDetail.additionalRate,
        resourceRate1: data.timesheetExpenseDetail.resourceRate1,
        additionalRate1: data.timesheetExpenseDetail.additionalRate1,
        regularExpense: data.timesheetExpenseDetail.regularExpense,
        otherExpense: data.timesheetExpenseDetail.otherExpense,
        discount: data.timesheetExpenseDetail.discount,
        amountRemarks: data.timesheetExpenseDetail.amountRemarks
      } : undefined
    };
  }

  /**
   * Get additions linked to a pay period
   * @param id Pay period ID
   * @returns Observable of PayAddition array
   */
  getPayPeriodAdditions(id: number): Observable<PayAddition[]> {
    return this.http.get<PayAddition[]>(`${this.baseUrl}/api/PayPeriods/${id}/Additions`);
  }

  /**
   * Get a single pay addition by ID
   * @param id Pay addition ID
   * @returns Observable of PayAddition
   */
  getPayAddition(id: number): Observable<PayAddition> {
    return this.http.get<PayAddition>(`${this.baseUrl}/api/PayPeriods/Additions/${id}`);
  }

  /**
   * Add a new pay addition
   * @param payAddition PayAddition object
   * @returns Observable of created PayAddition
   */
  addPayAddition(payAddition: PayAddition): Observable<PayAddition> {
    return this.http.post<PayAddition>(`${this.baseUrl}/api/PayPeriods/Additions`, payAddition);
  }

  /**
   * Update an existing pay addition
   * @param id Pay addition ID
   * @param payAddition Updated PayAddition object
   * @returns Observable of any
   */
  updatePayAddition(id: number, payAddition: PayAddition): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/PayPeriods/Additions/${id}`, payAddition);
  }

  /**
   * Delete a pay addition
   * @param id Pay addition ID
   * @returns Observable of any
   */
  deletePayAddition(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/PayPeriods/Additions/${id}`);
  }
}
