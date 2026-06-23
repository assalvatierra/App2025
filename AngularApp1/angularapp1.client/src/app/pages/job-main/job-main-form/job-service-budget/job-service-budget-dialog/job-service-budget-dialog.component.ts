import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiJobServiceBudgetService } from '../../../../../core/services/api-job-service-budget.service';
import { JobServiceBudget } from '../../../../../core/models/job-service-budget.model';
import { ApiService } from '../../../../../core/api.service';
import { ApiJobServiceService } from '../../../../../core/services/api-job-service.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-job-service-budget-dialog',
  standalone: false,
  templateUrl: './job-service-budget-dialog.component.html',
  styleUrls: ['./job-service-budget-dialog.component.css']
})
export class JobServiceBudgetDialogComponent implements OnInit {
  budgetForm: FormGroup;
  isEditMode: boolean = false;
  budgetId: number = 0;
  jobMainId: number = 0;
  loadError: boolean = false;

  public itemStatuses: any[] = [];
  public itemTypes: any[] = [];
  public jobServices: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<JobServiceBudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apiService: ApiJobServiceBudgetService,
    private apiLookup: ApiService,
    private apiJobService: ApiJobServiceService
  ) {
    this.budgetForm = this.fb.group({
      id: [0],
      jobMainId: [null, Validators.required],
      jobServiceId: [null],
      amount: [0, [Validators.required, Validators.min(0)]],
      remarks: [''],
      itemTypeId: [null],
      itemStatusId: [null],
      createdBy: ['System', Validators.required],
      createdOn: [new Date(), Validators.required],
      lastEditBy: ['System', Validators.required],
      lastEditOn: [new Date(), Validators.required],
      isArchived: [false],
      isPrivate: [false],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadItemStatuses();
    this.loadItemTypes();

    // Get data from parent component
    this.budgetId = this.data.budgetId || 0;
    this.jobMainId = this.data.jobMainId || 0;
    this.isEditMode = this.budgetId !== 0;

    // Set jobMainId in form
    if (this.jobMainId > 0) {
      this.budgetForm.patchValue({ jobMainId: this.jobMainId }, { emitEvent: false });
      this.loadJobServices(this.jobMainId);
    }

    if (this.isEditMode) {
      this.loadBudget();
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    if (this.budgetForm.valid) {
      this.onSubmit();
    } else {
      console.log('Form validation errors:', this.budgetForm.errors);
      Object.keys(this.budgetForm.controls).forEach(key => {
        const control = this.budgetForm.get(key);
        if (control?.invalid) {
          console.log(`Field ${key} errors:`, control.errors);
        }
      });
      alert('Please fill in all required fields');
    }
  }

  onSubmit(): void {
    if (this.budgetForm.valid) {
      const formValue = this.budgetForm.value;

      const budget: JobServiceBudget = {
        id: formValue.id || 0,
        jobMainId: formValue.jobMainId,
        jobServiceId: formValue.jobServiceId || null,
        amount: formValue.amount || 0,
        remarks: formValue.remarks || null,
        itemTypeId: formValue.itemTypeId || null,
        itemStatusId: formValue.itemStatusId || null,
        createdBy: formValue.createdBy || 'System',
        createdOn: new Date(),
        lastEditBy: 'System',
        lastEditOn: new Date(),
        isArchived: formValue.isArchived || false,
        isPrivate: formValue.isPrivate || false,
        isActive: formValue.isActive !== false
      };

      // For edit mode, preserve creation info
      if (this.isEditMode) {
        budget.id = this.budgetId;
        budget.createdBy = formValue.createdBy;
        budget.createdOn = formValue.createdOn;
      }

      console.log('Submitting budget:', budget);

      if (this.isEditMode) {
        this.apiService.updateJobServiceBudget(this.budgetId, budget).subscribe({
          next: () => {
            console.log('Budget updated successfully');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error('Update error:', error);
            const errorMessage = error.error?.title || error.error?.message || error.message || 'Unknown error';
            alert('Error updating budget: ' + errorMessage);
          }
        });
      } else {
        // For create, don't send the ID field
        const createBudget = { ...budget };
        delete (createBudget as any).id;

        this.apiService.createJobServiceBudget(createBudget).subscribe({
          next: () => {
            console.log('Budget created successfully');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error('Create error:', error);
            console.error('Error details:', error.error);
            const errorMessage = error.error?.title || error.error?.message || error.message || 'Unknown error';
            alert('Error creating budget: ' + errorMessage);
          }
        });
      }
    } else {
      alert('Please fill in all required fields');
    }
  }

  private loadBudget(): void {
    this.apiService.getJobServiceBudget(this.budgetId)
      .pipe(
        catchError(err => {
          this.loadError = true;
          console.error('Error loading budget:', err);
          return [];
        })
      )
      .subscribe({
        next: (budget: JobServiceBudget) => {
          this.budgetForm.patchValue({
            id: budget.id,
            jobMainId: budget.jobMainId,
            jobServiceId: budget.jobServiceId,
            amount: budget.amount,
            remarks: budget.remarks,
            itemTypeId: budget.itemTypeId,
            itemStatusId: budget.itemStatusId,
            createdBy: budget.createdBy,
            createdOn: budget.createdOn,
            lastEditBy: budget.lastEditBy,
            lastEditOn: budget.lastEditOn,
            isArchived: budget.isArchived,
            isPrivate: budget.isPrivate,
            isActive: budget.isActive
          }, { emitEvent: false });
        },
        error: (error: any) => {
          this.loadError = true;
          console.error('Load error:', error);
        }
      });
  }

  private loadItemStatuses(): void {
    this.apiLookup
      .getItemStatusesByClassName('JobBudget')
      .subscribe({
        next: (items: any[]) => {
          this.itemStatuses = items;
        },
        error: (error: any) => {
          this.loadError = true;
          console.error('Item Statuses Load error:', error);
        }
      });
  }

  private loadItemTypes(): void {
    this.apiLookup
      .getItemTypesByClassName('JobBudget')
      .subscribe({
        next: (items: any[]) => {
          this.itemTypes = items;
        },
        error: (error: any) => {
          this.loadError = true;
          console.error('Item Types Load error:', error);
        }
      });
  }

  private loadJobServices(jobMainId: number): void {
    this.apiJobService.getJobsServiceByJobId(jobMainId)
      .subscribe({
        next: (services: any[]) => {
          this.jobServices = services;
        },
        error: (error: any) => {
          this.loadError = true;
          console.error('Job Services Load error:', error);
        }
      });
  }
}
