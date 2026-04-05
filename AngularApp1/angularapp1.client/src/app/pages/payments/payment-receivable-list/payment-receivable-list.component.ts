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
import { ReceivablePaymentLink } from '../../../core/models/payment.model';
import { PaymentDataService } from '../payment-service/payment-data.service';
import { ApiReceivablesService } from '../../../core/services/api-receivables.service';

@Component({
  selector: 'app-payment-receivable-list',
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
  templateUrl: './payment-receivable-list.component.html',
  styleUrls: ['./payment-receivable-list.component.css']
})
export class PaymentReceivableListComponent implements OnInit, OnChanges {
  @Input() paymentId: number | null = null;

  receivablePayments: ReceivablePaymentLink[] = [];
  receivables: any[] = [];
  receivablePaymentForm!: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showForm: boolean = false;

  displayedColumns: string[] = ['receivable', 'amount', 'trxDate', 'actions'];

  constructor(
    private fb: FormBuilder,
    private dataService: PaymentDataService,
    private apiReceivables: ApiReceivablesService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadReceivables();
    this.loadReceivablePayments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paymentId'] && !changes['paymentId'].firstChange) {
      this.loadReceivablePayments();
    }
  }

  private initForm(): void {
    this.receivablePaymentForm = this.fb.group({
      id: [null],
      paymentsId: [null],
      receivablesId: [null, Validators.required]
    });
  }

  loadReceivables(): void {
    this.apiReceivables.getReceivables().subscribe({
      next: (receivables: any[]) => {
        this.receivables = receivables;
      },
      error: (error: any) => {
        console.error('Error loading receivables:', error);
        this.showMessage('Error loading receivables');
      }
    });
  }

  loadReceivablePayments(): void {
    if (this.paymentId) {
      this.dataService.getReceivablePayments(this.paymentId).subscribe({
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
      paymentsId: this.paymentId
    });
  }

  onEdit(receivablePayment: ReceivablePaymentLink): void {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = receivablePayment.id || null;
    this.receivablePaymentForm.patchValue(receivablePayment);
  }

  onDelete(receivablePayment: ReceivablePaymentLink): void {
    if (confirm('Are you sure you want to remove this receivable link?')) {
      if (receivablePayment.id) {
        this.dataService.deleteReceivablePayment(receivablePayment.id).subscribe({
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
      receivablePayment.paymentsId = this.paymentId || undefined;

      if (this.isEditing && this.editingId) {
        this.dataService.updateReceivablePayment(this.editingId, receivablePayment).subscribe({
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
        this.dataService.addReceivablePayment(receivablePaymentData as ReceivablePaymentLink).subscribe({
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

  getReceivableInfo(receivablesId: number | undefined): any {
    if (!receivablesId) return { ref: 'N/A', amount: 0, trxDate: '' };
    const receivable = this.receivables.find(r => r.id === receivablesId);
    return receivable ? {
      ref: receivable.trxRef || 'N/A',
      amount: receivable.amount || 0,
      trxDate: receivable.trxDate ? new Date(receivable.trxDate).toLocaleDateString() : ''
    } : { ref: 'Unknown', amount: 0, trxDate: '' };
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
