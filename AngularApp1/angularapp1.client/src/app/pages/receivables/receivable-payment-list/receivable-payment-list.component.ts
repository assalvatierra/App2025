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

interface ReceivablePaymentLink {
  id?: number;
  receivablesId?: number;
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
  selector: 'app-receivable-payment-list',
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
  templateUrl: './receivable-payment-list.component.html',
  styleUrls: ['./receivable-payment-list.component.css']
})
export class ReceivablePaymentListComponent implements OnInit, OnChanges {
  @Input() receivableId: number | null = null;

  receivablePayments: ReceivablePaymentLink[] = [];
  payments: Payment[] = [];
  receivablePaymentForm!: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showForm: boolean = false;

  displayedColumns: string[] = ['payment', 'amount', 'trxDate', 'remarks', 'actions'];

  private baseUrl = 'http://localhost:5157';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadPayments();
    this.loadReceivablePayments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receivableId'] && !changes['receivableId'].firstChange) {
      this.loadReceivablePayments();
    }
  }

  private initForm(): void {
    this.receivablePaymentForm = this.fb.group({
      id: [null],
      receivablesId: [null],
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

  loadReceivablePayments(): void {
    if (this.receivableId) {
      this.http.get<ReceivablePaymentLink[]>(`${this.baseUrl}/api/ReceivablePayments/byReceivable/${this.receivableId}`)
        .subscribe({
          next: (receivablePayments: ReceivablePaymentLink[]) => {
            this.receivablePayments = receivablePayments;
          },
          error: (error: any) => {
            console.error('Error loading receivable payments:', error);
            this.showMessage('Error loading receivable payments');
          }
        });
    }
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.editingId = null;
    this.receivablePaymentForm.reset();
    this.receivablePaymentForm.patchValue({
      receivablesId: this.receivableId
    });
  }

  onEdit(receivablePayment: ReceivablePaymentLink): void {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = receivablePayment.id || null;
    this.receivablePaymentForm.patchValue(receivablePayment);
  }

  onDelete(receivablePayment: ReceivablePaymentLink): void {
    if (confirm('Are you sure you want to remove this payment link?')) {
      if (receivablePayment.id) {
        this.http.delete(`${this.baseUrl}/api/ReceivablePayments/${receivablePayment.id}`).subscribe({
          next: () => {
            this.showMessage('Receivable payment link deleted successfully');
            this.loadReceivablePayments();
          },
          error: (error: any) => {
            console.error('Error deleting receivable payment:', error);
            this.showMessage('Error deleting receivable payment');
          }
        });
      }
    }
  }

  onSubmit(): void {
    if (this.receivablePaymentForm.valid) {
      const receivablePayment: ReceivablePaymentLink = this.receivablePaymentForm.value;
      receivablePayment.receivablesId = this.receivableId || undefined;

      if (this.isEditing && this.editingId) {
        this.http.put(`${this.baseUrl}/api/ReceivablePayments/${this.editingId}`, receivablePayment).subscribe({
          next: () => {
            this.showMessage('Receivable payment link updated successfully');
            this.loadReceivablePayments();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error updating receivable payment:', error);
            this.showMessage('Error updating receivable payment');
          }
        });
      } else {
        const { id, ...receivablePaymentData } = receivablePayment;
        this.http.post<ReceivablePaymentLink>(`${this.baseUrl}/api/ReceivablePayments`, receivablePaymentData).subscribe({
          next: () => {
            this.showMessage('Receivable payment link added successfully');
            this.loadReceivablePayments();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error adding receivable payment:', error);
            this.showMessage('Error adding receivable payment');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.isEditing = false;
    this.editingId = null;
    this.receivablePaymentForm.reset();
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
