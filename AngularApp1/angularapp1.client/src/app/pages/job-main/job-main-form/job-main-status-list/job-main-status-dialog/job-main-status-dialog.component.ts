import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiJobMainStatusService } from '../../../../../core/services/api-job-main-status.service';

@Component({
  selector: 'app-job-main-status-dialog',
  standalone: false,
  templateUrl: './job-main-status-dialog.component.html',
  styleUrl: './job-main-status-dialog.component.css'
})
export class JobMainStatusDialogComponent implements OnInit {
  public statusForm!: FormGroup;
  public dataloading: boolean = false;
  public isEditMode: boolean = false;
  public itemStatusLookupData: any[] = [];
  private statusId: number = 0;
  private jobMainId: number = 0;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiJobMainStatusService,
    public dialogRef: MatDialogRef<JobMainStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.statusId = this.data.statusId || 0;
    this.jobMainId = this.data.jobMainId || 0;
    this.itemStatusLookupData = this.data.itemStatusLookupData || [];
    this.isEditMode = this.statusId !== 0;

    if (this.isEditMode) {
      this.loadStatusData();
    } else {
      this.setDefaultValues();
    }
  }

  private initForm(): void {
    this.statusForm = this.fb.group({
      itemStatusId: [null, Validators.required],
      statusDate: [new Date(), Validators.required],
      remarks: ['']
    });
  }

  private setDefaultValues(): void {
    this.statusForm.patchValue({
      itemStatusId: null,
      statusDate: new Date(),
      remarks: ''
    });
  }

  private loadStatusData(): void {
    this.dataloading = true;
    this.apiService.getJobMainStatus(this.statusId).subscribe({
      next: (data: any) => {
        this.statusForm.patchValue({
          itemStatusId: data.itemStatusId,
          statusDate: new Date(data.statusDate),
          remarks: data.remarks || ''
        });
        this.dataloading = false;
      },
      error: (err) => {
        console.error('Error loading status data:', err);
        this.dataloading = false;
      }
    });
  }

  onSave(): void {
    if (this.statusForm.valid) {
      this.dataloading = true;
      const now = new Date().toISOString();
      
      const formData = {
        id: this.statusId,
        jobMainId: this.jobMainId,
        itemStatusId: this.statusForm.get('itemStatusId')?.value,
        statusDate: this.statusForm.get('statusDate')?.value,
        remarks: this.statusForm.get('remarks')?.value,
        createdBy: this.isEditMode ? undefined : 'System',
        createdOn: this.isEditMode ? undefined : now,
        lastEditBy: 'System',
        lastEditOn: now,
        isArchived: false,
        isPrivate: false,
        isActive: true
      };

      if (this.isEditMode) {
        this.apiService.updateJobMainStatus(this.statusId, formData).subscribe({
          next: () => {
            console.log('Status updated successfully');
            this.dataloading = false;
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error updating status:', err);
            this.dataloading = false;
          }
        });
      } else {
        this.apiService.addJobMainStatus(formData).subscribe({
          next: () => {
            console.log('Status added successfully');
            this.dataloading = false;
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error adding status:', err);
            this.dataloading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.statusForm.controls).forEach(key => {
      const control = this.statusForm.get(key);
      control?.markAsTouched();
    });
  }
}
