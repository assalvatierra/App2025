import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { PayExpense } from '../../../core/models/pay-expense.model';
import { PayPeriod } from '../../../core/models/pay-period.model';
import { ApiPayPeriodsService } from '../../../core/services/api-pay-periods.service';

@Component({
  selector: 'app-expense-pay-period-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './expense-pay-period-list.component.html',
  styleUrls: ['./expense-pay-period-list.component.css']
})
export class ExpensePayPeriodListComponent implements OnInit, OnChanges {
  @Input() expenseId: number | null = null;

  payExpenses: PayExpense[] = [];
  payPeriods: PayPeriod[] = [];
  payExpenseForm!: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showForm: boolean = false;

  displayedColumns: string[] = ['notes', 'dateFrom', 'dateTo', 'payDate', 'actions'];

  private baseUrl = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiPayPeriods: ApiPayPeriodsService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadPayPeriods();
    this.loadPayExpenses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenseId'] && !changes['expenseId'].firstChange) {
      this.loadPayExpenses();
    }
  }

  private initForm(): void {
    this.payExpenseForm = this.fb.group({
      id: [null],
      expenseId: [null],
      payPeriodId: [null, Validators.required]
    });
  }

  loadPayPeriods(): void {
    this.apiPayPeriods.getPayPeriods().subscribe({
      next: (payPeriods: PayPeriod[]) => {
        this.payPeriods = payPeriods;
      },
      error: (error: any) => {
        console.error('Error loading pay periods:', error);
        this.showMessage('Error loading pay periods');
      }
    });
  }

  loadPayExpenses(): void {
    if (this.expenseId) {
      this.http.get<PayExpense[]>(`${this.baseUrl}/api/PayExpenses/byExpense/${this.expenseId}`).subscribe({
        next: (payExpenses: PayExpense[]) => {
          this.payExpenses = payExpenses;
        },
        error: (error: any) => {
          console.error('Error loading pay expenses:', error);
          this.showMessage('Error loading resource expenses');
        }
      });
    }
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.editingId = null;
    this.payExpenseForm.reset();
    this.payExpenseForm.patchValue({ expenseId: this.expenseId });
  }

  onEdit(payExpense: PayExpense): void {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = payExpense.id;
    this.payExpenseForm.patchValue({
      id: payExpense.id,
      expenseId: payExpense.expenseId,
      payPeriodId: payExpense.payPeriodId
    });
  }

  onDelete(payExpense: PayExpense): void {
    if (confirm('Are you sure you want to remove this pay period link?')) {
      this.http.delete(`${this.baseUrl}/api/PayExpenses/${payExpense.id}`).subscribe({
        next: () => {
          this.showMessage('Pay period link deleted successfully');
          this.loadPayExpenses();
        },
        error: (error: any) => {
          console.error('Error deleting pay expense:', error);
          this.showMessage('Error deleting pay period link');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.payExpenseForm.valid) {
      const payExpense = {
        ...this.payExpenseForm.value,
        expenseId: this.expenseId
      };

      if (this.isEditing && this.editingId) {
        this.http.put(`${this.baseUrl}/api/PayExpenses/${this.editingId}`, payExpense).subscribe({
          next: () => {
            this.showMessage('Pay period link updated successfully');
            this.loadPayExpenses();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error updating pay expense:', error);
            this.showMessage('Error updating pay period link');
          }
        });
      } else {
        const { id, ...payExpenseData } = payExpense;
        this.http.post(`${this.baseUrl}/api/PayExpenses`, payExpenseData).subscribe({
          next: () => {
            this.showMessage('Pay period link added successfully');
            this.loadPayExpenses();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error adding pay expense:', error);
            this.showMessage('Error adding pay period link');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.isEditing = false;
    this.editingId = null;
    this.payExpenseForm.reset();
  }

  getPayPeriodInfo(payPeriodId: number | undefined): PayPeriod | undefined {
    if (!payPeriodId) return undefined;
    return this.payPeriods.find(p => p.id === payPeriodId);
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
