import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiExpensesService } from '../../../core/services/api-expenses.service';
import { ApiEntityService } from '../../../core/services/api-entity.service';
import { Expense, ExpenseStatus } from '../../../core/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDataService {

  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  private entitiesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public expenses$ = this.expensesSubject.asObservable();
  public entities$ = this.entitiesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  public dataloading: boolean = true;

  constructor(
    private apiExpenses: ApiExpensesService,
    private apiEntity: ApiEntityService
  ) { }

  /**
   * Load all entities from the API
   */
  loadEntities(): void {
    this.apiEntity.getEntities().subscribe({
      next: (res: any) => {
        this.entitiesSubject.next(res || []);
      },
      error: (err: any) => {
        console.error('Error loading entities:', err);
      }
    });
  }

  /**
   * Load all expenses from the API
   */
  loadExpenses(): void {
    this.loadingSubject.next(true);
    this.apiExpenses.getExpenses().subscribe({
      next: (res: any) => {
        console.log('Expenses loaded:', res);
        this.expensesSubject.next(res || []);
        this.loadingSubject.next(false);
      },
      error: (err: any) => {
        console.error('Error loading expenses:', err);
        this.loadingSubject.next(false);
      }
    });
  }

  /**
   * Load a single expense by ID
   */
  loadExpense(id: number): Observable<Expense> {
    this.loadingSubject.next(true);
    return this.apiExpenses.getExpense(id).pipe(
      tap({
        next: (expense) => {
          console.log('Expense loaded:', expense);
          this.loadingSubject.next(false);
        },
        error: (error) => {
          console.error('Error loading expense:', error);
          this.loadingSubject.next(false);
        }
      })
    );
  }

  /**
   * Add a new expense
   */
  addExpense(expense: Expense): Observable<Expense> {
    return this.apiExpenses.addExpense(expense);
  }

  /**
   * Update an existing expense
   */
  updateExpense(id: number, expense: Expense): Observable<any> {
    return this.apiExpenses.updateExpense(id, expense).pipe(
      tap({
        error: (err) => console.error('Error updating expense:', err)
      })
    );
  }

  /**
   * Delete an expense
   */
  deleteExpense(id: number): Observable<any> {
    return this.apiExpenses.deleteExpense(id).pipe(
      tap({
        error: (err) => console.error('Error deleting expense:', err)
      })
    );
  }

  // ===== ExpenseStatus Methods =====

  /**
   * Get statuses for a given expense ID
   */
  getExpenseStatuses(expenseId: number): Observable<ExpenseStatus[]> {
    return this.apiExpenses.getExpenseStatuses(expenseId);
  }

  /**
   * Add a status to an expense
   */
  addExpenseStatus(expenseId: number, status: ExpenseStatus): Observable<ExpenseStatus> {
    return this.apiExpenses.addExpenseStatus(expenseId, status);
  }
}
