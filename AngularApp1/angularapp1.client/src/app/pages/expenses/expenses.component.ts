import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseDataService } from './expense-service/expense-data.service';
import { Expense } from '../../core/models/expense.model';

@Component({
  selector: 'app-expenses',
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  imports: [CommonModule, ExpenseListComponent, ExpenseFormComponent],
  providers: [ExpenseDataService]
})
export class ExpensesComponent implements OnInit {

  public currentView: 'list' | 'form' = 'list';
  public expenses: Expense[] = [];
  public selectedExpense: Expense | null = null;
  public dataloading: boolean = true;
  public entities: any[] = [];

  constructor(private expenseDataService: ExpenseDataService) { }

  ngOnInit(): void {
    this.expenseDataService.loadEntities();
    this.expenseDataService.loadExpenses();
    this.dataloading = this.expenseDataService.dataloading;

    this.expenseDataService.expenses$.subscribe(data => {
      this.expenses = data;
      this.dataloading = false;
    });

    this.expenseDataService.entities$.subscribe(data => {
      this.entities = data;
    });

    this.expenseDataService.loading$.subscribe(loading => {
      this.dataloading = loading;
    });
  }

  /**
   * Handle add record button click
   */
  onAddRecord(): void {
    this.selectedExpense = null;
    this.currentView = 'form';
  }

  /**
   * Handle edit record
   */
  onEditRecord(expenseId: number): void {
    this.expenseDataService.loadExpense(expenseId).subscribe({
      next: (expense) => {
        this.selectedExpense = expense;
        this.currentView = 'form';
      },
      error: (error) => {
        console.error('Error loading expense for edit:', error);
        alert(`Failed to load expense: ${error.message}`);
        this.dataloading = false;
      }
    });
  }

  /**
   * Handle delete record
   */
  onDeleteRecord(expenseId: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseDataService.deleteExpense(expenseId).subscribe(() => {
        this.expenseDataService.loadExpenses();
      });
    }
  }

  /**
   * Handle archive record — sets isActive = false
   */
  onArchiveRecord(expenseId: number): void {
    if (confirm('Are you sure you want to archive this expense?')) {
      this.expenseDataService.loadExpense(expenseId).subscribe({
        next: (expense) => {
          expense.isArchived = true;
          expense.isActive = false;
          this.expenseDataService.updateExpense(expenseId, expense).subscribe(() => {
            this.expenseDataService.loadExpenses();
          });
        }
      });
    }
  }

  /**
   * Handle activate record — sets isActive = true
   */
  onActivateRecord(expenseId: number): void {
    this.expenseDataService.loadExpense(expenseId).subscribe({
      next: (expense) => {
        expense.isActive = true;
        expense.isArchived = false;
        this.expenseDataService.updateExpense(expenseId, expense).subscribe(() => {
          this.expenseDataService.loadExpenses();
        });
      }
    });
  }

  /**
   * Handle save from form
   */
  onSaveRecord(expense: Expense): void {
    if (expense.id) {
      this.expenseDataService.updateExpense(expense.id, expense).subscribe({
        next: () => {
          this.expenseDataService.loadExpenses();
          this.expenseDataService.loadExpense(expense.id!).subscribe({
            next: (updated) => {
              this.selectedExpense = updated;
            },
            error: (err) => console.error('Error reloading expense:', err)
          });
        },
        error: (error) => {
          console.error('Error updating expense:', error);
          alert(`Failed to update expense: ${error.message}`);
        }
      });
    } else {
      this.expenseDataService.addExpense(expense).subscribe({
        next: (newExpense) => {
          this.expenseDataService.loadExpenses();
          if (newExpense.id) {
            this.expenseDataService.loadExpense(newExpense.id).subscribe({
              next: (complete) => {
                this.selectedExpense = complete;
                this.currentView = 'form';
              },
              error: () => {
                this.selectedExpense = newExpense;
                this.currentView = 'form';
              }
            });
          } else {
            this.selectedExpense = newExpense;
            this.currentView = 'form';
          }
        },
        error: (error) => {
          console.error('Error adding expense:', error);
          alert(`Failed to add expense: ${error.message}`);
        }
      });
    }
  }

  /**
   * Handle cancel from form
   */
  onCancelForm(): void {
    this.selectedExpense = null;
    this.currentView = 'list';
  }
}
