import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ApiJobCustomersService, JobCustomerDto } from '../../../../../core/services/api-job-customers.service';

@Component({
  selector: 'app-job-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './job-customer-form.component.html',
  styleUrl: './job-customer-form.component.css'
})
export class JobCustomerFormComponent implements OnInit {

  public customerForm!: FormGroup;
  public isLoading: boolean = false;
  public isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiJobCustomersService,
    public dialogRef: MatDialogRef<JobCustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobMainId: number; customerId?: number }
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    if (this.data && this.data.customerId && this.data.customerId > 0) {
      this.isEditMode = true;
      this.loadCustomerData(this.data.customerId);
    }
  }

  private initializeForm(): void {
    this.customerForm = this.fb.group({
      customerId: ['', Validators.required],
      jobMainId: [this.data?.jobMainId || 0],
      isPrimary: [false],
      isBillTo: [false],
      notes: ['']
    });
  }

  private loadCustomerData(customerId: number): void {
    this.isLoading = true;
    this.api.getJobCustomer(customerId)
      .subscribe({
        next: (customer: JobCustomerDto) => {
          this.customerForm.patchValue({
            customerId: customer.customerId,
            jobMainId: customer.jobMainId,
            isPrimary: customer.isPrimary,
            isBillTo: customer.isBillTo,
            notes: customer.notes
          });
        },
        error: (err) => {
          console.error('Error loading customer:', err);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.isLoading = true;
    const formValue = this.customerForm.value;

    if (this.isEditMode && this.data.customerId) {
      // Update existing customer
      const payload = {
        id: this.data.customerId,
        ...formValue
      };
      this.api.updateJobCustomer(this.data.customerId, payload)
        .subscribe({
          next: () => {
            console.log('Customer updated successfully');
            this.dialogRef.close({ action: 'save', data: payload });
          },
          error: (err) => {
            console.error('Error updating customer:', err);
            this.isLoading = false;
          }
        });
    } else {
      // Create new customer
      this.api.addJobCustomer(formValue)
        .subscribe({
          next: (result: JobCustomerDto) => {
            console.log('Customer created successfully');
            this.dialogRef.close({ action: 'save', data: result });
          },
          error: (err) => {
            console.error('Error creating customer:', err);
            this.isLoading = false;
          }
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
