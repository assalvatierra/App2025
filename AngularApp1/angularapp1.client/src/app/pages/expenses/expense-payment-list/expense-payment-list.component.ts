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
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface ExpensePaymentLink {
  id?: number;
  expensesId?: number;
  paymentsId?: number;
  payments?: any;
}

interface Payment {
  id: number;
  trxDate: Date;
  amount: number;
  remarks: string;
  entityId?: number;
  isActive?: boolean;
}

@Component({
  selector: 'app-expense-payment-list',
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
  templateUrl: './expense-payment-list.component.html',
  styleUrls: ['./expense-payment-list.component.css']
})
export class ExpensePaymentListComponent implements OnInit, OnChanges {
  @Input() expenseId: number | null = null;

  expensePayments: ExpensePaymentLink[] = [];
  payments: Payment[] = [];
  expensePaymentForm!: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showForm: boolean = false;

  displayedColumns: string[] = ['payment', 'amount', 'trxDate', 'remarks', 'actions'];

  private baseUrl = environment.apiConfig.uri;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadPayments();
    this.loadExpensePayments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenseId'] && !changes['expenseId'].firstChange) {
      this.loadExpensePayments();
    }
  }

  private initForm(): void {
    this.expensePaymentForm = this.fb.group({
      id: [null],
      expensesId: [null],
      paymentsId: [null, Validators.required]
    });
  }

  loadPayments(): void {
    this.http.get<Payment[]>(`${this.baseUrl}/api/Payments`).subscribe({
      next: (payments: Payment[]) => {
        this.payments = payments;
      },
      error: (error: any) => {
        console.error('Error loading payments:', error);
        this.showMessage('Error loading payments');
      }
    });
  }

  loadExpensePayments(): void {
    if (this.expenseId) {
      this.http.get<ExpensePaymentLink[]>(`${this.baseUrl}/api/ExpensePayments/byExpense/${this.expenseId}`)
        .subscribe({
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
      expensesId: this.expenseId
    });
  }

  onEdit(expensePayment: ExpensePaymentLink): void {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = expensePayment.id || null;
    this.expensePaymentForm.patchValue(expensePayment);
  }

  onDelete(expensePayment: ExpensePaymentLink): void {
    if (confirm('Are you sure you want to remove this payment link?')) {
      if (expensePayment.id) {
        this.http.delete(`${this.baseUrl}/api/ExpensePayments/${expensePayment.id}`).subscribe({
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
      expensePayment.expensesId = this.expenseId || undefined;

      if (this.isEditing && this.editingId) {
        this.http.put(`${this.baseUrl}/api/ExpensePayments/${this.editingId}`, expensePayment).subscribe({
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
        this.http.post<ExpensePaymentLink>(`${this.baseUrl}/api/ExpensePayments`, expensePaymentData).subscribe({
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

  getPaymentInfo(paymentsId: number | undefined): any {
    if (!paymentsId) return { ref: 'N/A', amount: 0, trxDate: '', remarks: '' };
    const payment = this.payments.find(p => p.id === paymentsId);
    return payment ? {
      ref: `Payment #${payment.id}`,
      amount: payment.amount || 0,
      trxDate: payment.trxDate ? new Date(payment.trxDate).toLocaleDateString() : '',
      remarks: payment.remarks || ''
    } : { ref: 'Unknown', amount: 0, trxDate: '', remarks: '' };
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
