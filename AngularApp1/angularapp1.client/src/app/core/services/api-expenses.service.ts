import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Expense, ExpenseStatus, ExpensePayment } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ApiExpensesService {

  // Use relative URL to leverage Angular proxy configuration
  private baseUrl = '';

  constructor(private http: HttpClient) { }

  /**
   * Get all expenses
   */
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/api/Expenses`).pipe(
      map((res: any) => res.map((e: any) => this.mapExpense(e))),
      catchError((error) => {
        console.error('Error fetching expenses:', error);
        return throwError(() => new Error(`Failed to fetch expenses: ${error.message || error.statusText}`));
      })
    );
  }

  /**
   * Get expenses by entity ID
   */
  getExpensesByEntity(entityId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/api/Expenses/byEntity/${entityId}`).pipe(
      map((res: any) => res.map((e: any) => this.mapExpense(e))),
      catchError((error) => {
        console.error('Error fetching expenses by entity:', error);
        return throwError(() => new Error(`Failed to fetch expenses for entity ${entityId}: ${error.message || error.statusText}`));
      })
    );
  }

  /**
   * Get a single expense by ID
   */
  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.baseUrl}/api/Expenses/${id}`).pipe(
      map((e: any) => this.mapExpense(e)),
      catchError((error) => {
        console.error('Error fetching expense:', error);
        return throwError(() => new Error(`Failed to fetch expense with id ${id}: ${error.message || error.statusText}`));
      })
    );
  }

  /**
   * Create a new expense
   */
  addExpense(expense: Expense): Observable<Expense> {
    const { id, ...expenseData } = expense;
    return this.http.post<Expense>(`${this.baseUrl}/api/Expenses`, expenseData).pipe(
      map((e: any) => this.mapExpense(e)),
      catchError((error) => {
        console.error('Error creating expense:', error);
        return throwError(() => new Error(`Failed to create expense: ${error.message || error.statusText}`));
      })
    );
  }

  /**
   * Update an existing expense
   */
  updateExpense(id: number, expense: Expense): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Expenses/${id}`, expense).pipe(
      catchError((error) => {
        console.error('Error updating expense:', error);
        return throwError(() => new Error(`Failed to update expense with id ${id}: ${error.message || error.statusText}`));
      })
    );
  }

  /**
   * Delete an expense
   */
  deleteExpense(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Expenses/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting expense:', error);
        return throwError(() => new Error(`Failed to delete expense with id ${id}: ${error.message || error.statusText}`));
      })
    );
  }

  /**
   * Get statuses for an expense
   */
  getExpenseStatuses(id: number): Observable<ExpenseStatus[]> {
    return this.http.get<ExpenseStatus[]>(`${this.baseUrl}/api/Expenses/${id}/Statuses`).pipe(
      catchError((error) => {
        console.error('Error fetching expense statuses:', error);
        return throwError(() => new Error(`Failed to fetch statuses for expense ${id}: ${error.message || error.statusText}`));
      })
    );
  }

  /**
   * Add a status to an expense
   */
  addExpenseStatus(id: number, status: ExpenseStatus): Observable<ExpenseStatus> {
    return this.http.post<ExpenseStatus>(`${this.baseUrl}/api/Expenses/${id}/Statuses`, status).pipe(
      catchError((error) => {
        console.error('Error adding expense status:', error);
        return throwError(() => new Error(`Failed to add status for expense ${id}: ${error.message || error.statusText}`));
      })
    );
  }

  // ── Mapping helper ──────────────────────────────────────────────────────────

  private mapExpense(data: any): Expense {
    return {
      id: data.id,
      trxDate: data.trxDate ? new Date(data.trxDate) : new Date(),
      amount: data.amount,
      createdBy: data.createdBy,
      createdOn: data.createdOn ? new Date(data.createdOn) : undefined,
      lastEditBy: data.lastEditBy,
      lastEditOn: data.lastEditOn ? new Date(data.lastEditOn) : undefined,
      isArchived: data.isArchived,
      isPrivate: data.isPrivate,
      isActive: data.isActive,
      remarks: data.remarks,
      entityId: data.entityId,
      expensePayments: data.expensePayments,
      expenseStatuses: data.expenseStatuses
    };
  }
}
