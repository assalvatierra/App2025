import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiPayPeriodsService } from '../../../../core/services/api-pay-periods.service';
import { ApiService } from '../../../../core/api.service';
import { PayPeriod } from '../../../../core/models/pay-period.model';

export interface PayPeriodDialogData {
  payPeriod?: PayPeriod | null;
}

@Component({
  selector: 'app-pay-period-dialog',
  standalone: true,
  templateUrl: './pay-period-dialog.component.html',
  styleUrls: ['./pay-period-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ]
})
export class PayPeriodDialogComponent implements OnInit {
  public payPeriodForm!: FormGroup;
  public isEdit: boolean = false;
  public loading: boolean = false;
  public statuses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiPayPeriods: ApiPayPeriodsService,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<PayPeriodDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: PayPeriodDialogData
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadStatuses();
    this.isEdit = !!this.data.payPeriod;

    if (this.isEdit && this.data.payPeriod) {
      this.payPeriodForm.patchValue({
        dateFrom: this.parseDate(this.data.payPeriod.dateFrom),
        dateTo: this.parseDate(this.data.payPeriod.dateTo),
        payDate: this.parseDate(this.data.payPeriod.payDate),
        notes: this.data.payPeriod.notes,
        itemStatusId: this.data.payPeriod.itemStatusId,
        isActive: this.data.payPeriod.isActive,
        isPrivate: this.data.payPeriod.isPrivate,
        isArchived: this.data.payPeriod.isArchived
      });
    }
  }

  private parseDate(date: any): Date {
    if (date instanceof Date) {
      return date;
    }
    if (typeof date === 'string') {
      const match = date.match(/\/Date\((\d+)\)\//);
      if (match) {
        return new Date(parseInt(match[1]));
      }
      return new Date(date);
    }
    return new Date();
  }

  private initializeForm(): void {
    this.payPeriodForm = this.fb.group({
      dateFrom: [new Date(), Validators.required],
      dateTo: [new Date(new Date().setDate(new Date().getDate() + 14)), Validators.required],
      payDate: [new Date(new Date().setDate(new Date().getDate() + 21)), Validators.required],
      notes: [''],
      itemStatusId: [null],
      isActive: [true],
      isPrivate: [false],
      isArchived: [false]
    });
  }

  private loadStatuses(): void {
    this.apiService.getItemStatusesByClassName('PayPeriod').subscribe({
      next: (res: any) => {
        this.statuses = res || [];
      },
      error: (err) => {
        console.error('Error loading statuses:', err);
        // Fallback to all statuses if className filter doesn't work
        this.apiService.getItemStatuses().subscribe({
          next: (res: any) => {
            this.statuses = res || [];
          },
          error: (err) => {
            console.error('Error loading all statuses:', err);
          }
        });
      }
    });
  }

  public onSave(): void {
    if (this.payPeriodForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
      return;
    }

    const formValue = this.payPeriodForm.value;
    const payPeriodData: any = {
      dateFrom: formValue.dateFrom ? this.toLocalISOString(formValue.dateFrom) : null,
      dateTo: formValue.dateTo ? this.toLocalISOString(formValue.dateTo) : null,
      payDate: formValue.payDate ? this.toLocalISOString(formValue.payDate) : null,
      notes: formValue.notes || '',
      itemStatusId: formValue.itemStatusId,
      isActive: formValue.isActive !== false,
      isPrivate: formValue.isPrivate || false,
      isArchived: formValue.isArchived || false,
      createdBy: this.data.payPeriod?.createdBy || 'system',
      createdOn: this.data.payPeriod?.createdOn ? new Date(this.data.payPeriod.createdOn).toISOString() : new Date().toISOString(),
      lastEditBy: 'system',
      lastEditOn: new Date().toISOString()
    };

    if (this.isEdit && this.data.payPeriod) {
      payPeriodData.id = this.data.payPeriod.id;
    }

    this.loading = true;

    if (this.isEdit && this.data.payPeriod) {
      this.apiPayPeriods.updatePayPeriod(this.data.payPeriod.id, payPeriodData).subscribe({
        next: (result) => {
          this.snackBar.open('Pay period updated successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating pay period:', error);
          this.snackBar.open('Error updating pay period', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    } else {
      this.apiPayPeriods.addPayPeriod(payPeriodData).subscribe({
        next: (result) => {
          this.snackBar.open('Pay period added successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('Error adding pay period:', error);
          this.snackBar.open('Error adding pay period', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  private toLocalISOString(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}
