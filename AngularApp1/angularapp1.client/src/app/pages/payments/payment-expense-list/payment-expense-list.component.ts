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
import { ExpensePaymentLink } from '../../../core/models/payment.model';
import { PaymentDataService } from '../payment-service/payment-data.service';
import { ApiExpensesService } from '../../../core/services/api-expenses.service';

@Component({
  selector: 'app-payment-expense-list',
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
  templateUrl: './payment-expense-list.component.html',
  styleUrls: ['./payment-expense-list.component.css']
})
export class PaymentExpenseListComponent implements OnInit, OnChanges {
  @Input() paymentId: number | null = null;

  expensePayments: ExpensePaymentLink[] = [];
  expenses: any[] = [];
  expensePaymentForm!: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showForm: boolean = false;

  displayedColumns: string[] = ['expense', 'amount', 'trxDate', 'actions'];

  constructor(
    private fb: FormBuilder,
    private dataService: PaymentDataService,
    private apiExpenses: ApiExpensesService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadExpensePayments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paymentId'] && !changes['paymentId'].firstChange) {
      this.loadExpensePayments();
    }
  }

  private initForm(): void {
    this.expensePaymentForm = this.fb.group({
      id: [null],
      paymentsId: [null],
      expensesId: [null, Validators.required]
    });
  }

  loadExpenses(): void {
    this.apiExpenses.getExpenses().subscribe({
      next: (expenses: any[]) => {
        this.expenses = expenses;
      },
      error: (error: any) => {
        console.error('Error loading expenses:', error);
        this.showMessage('Error loading expenses');
      }
    });
  }

  loadExpensePayments(): void {
    if (this.paymentId) {
      this.dataService.getExpensePayments(this.paymentId).subscribe({
        next: (expensePayments: ExpensePaymentLink[]) => {
          this.expensePayments = expensePayments;
        },
        error: (error: any) => {
          console.error('Error loading expense payments:', error);
          this.showMessage('Error loading expense payments');
        }
      });
    }
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.editingId = null;
    this.expensePaymentForm.reset();
    this.expensePaymentForm.patchValue({
      paymentsId: this.paymentId
    });
  }

  onEdit(expensePayment: ExpensePaymentLink): void {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = expensePayment.id || null;
    this.expensePaymentForm.patchValue(expensePayment);
  }

  onDelete(expensePayment: ExpensePaymentLink): void {
    if (confirm('Are you sure you want to remove this expense link?')) {
      if (expensePayment.id) {
        this.dataService.deleteExpensePayment(expensePayment.id).subscribe({
          next: () => {
            this.showMessage('Expense payment link deleted successfully');
            this.loadExpensePayments();
          },
          error: (error: any) => {
            console.error('Error deleting expense payment:', error);
            this.showMessage('Error deleting expense payment');
          }
        });
      }
    }
  }

  onSubmit(): void {
    if (this.expensePaymentForm.valid) {
      const expensePayment: ExpensePaymentLink = this.expensePaymentForm.value;
      expensePayment.paymentsId = this.paymentId || undefined;

      if (this.isEditing && this.editingId) {
        this.dataService.updateExpensePayment(this.editingId, expensePayment).subscribe({
          next: () => {
            this.showMessage('Expense payment link updated successfully');
            this.loadExpensePayments();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error updating expense payment:', error);
            this.showMessage('Error updating expense payment');
          }
        });
      } else {
        const { id, ...expensePaymentData } = expensePayment;
        this.dataService.addExpensePayment(expensePaymentData as ExpensePaymentLink).subscribe({
          next: () => {
            this.showMessage('Expense payment link added successfully');
            this.loadExpensePayments();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error adding expense payment:', error);
            this.showMessage('Error adding expense payment');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.isEditing = false;
    this.editingId = null;
    this.expensePaymentForm.reset();
  }

  getExpenseInfo(expensesId: number | undefined): any {
    if (!expensesId) return { remarks: 'N/A', amount: 0, trxDate: '' };
    const expense = this.expenses.find(e => e.id === expensesId);
    return expense ? {
      remarks: expense.remarks || 'N/A',
      amount: expense.amount || 0,
      trxDate: expense.trxDate ? new Date(expense.trxDate).toLocaleDateString() : ''
    } : { remarks: 'Unknown', amount: 0, trxDate: '' };
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
