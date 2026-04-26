import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiJobServiceService, JobService } from '../../../../../core/services/api-job-service.service';
import { catchError } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/api.service';
import { ApiEntityService } from '../../../../../core/services/api-entity.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-main-service-dialog',
  standalone: false,
  templateUrl: './job-main-service-dialog.component.html',
  styleUrl: './job-main-service-dialog.component.css'
})

export class JobMainServiceDialogComponent implements OnInit, OnDestroy {

  jobServiceForm: FormGroup;
  isEditMode: boolean = false;
  serviceId: number = 0;
  jobMainId: number = 0;
  loadError: boolean = false;

  public itemStatuses: any[] = [];
  public serviceItems: any[] = [];
  public suppliers: any[] = [];

  private dateStartSub?: Subscription;
  private lastDateStart: Date | null = null; // track previous dateStart value

  constructor(
    public dialogRef: MatDialogRef<JobMainServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apiService: ApiJobServiceService,
    private apiServiceLookup: ApiService,
    private apiEntityService: ApiEntityService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.jobServiceForm = this.fb.group({
      id: [0],
      jobMainId: [null, Validators.required],
      particulars: [''],
      dateStart: [null],
      dateEnd: [null],
      quotedAmt: [0],
      supplierAmt: [0],
      createdBy: ['System', Validators.required],
      createdOn: [new Date(), Validators.required],
      lastEditBy: ['System', Validators.required],
      lastEditOn: [new Date(), Validators.required],
      isArchived: [false],
      isPrivate: [false],
      isActive: [true],
      serviceItemId: [null],
      supplierId: [null],
      itemStatusId: [null],
      sortOrder: [0]
    });
  }

  ngOnInit() {
    this.loadServiceItems();
    this.loadItemStatuses();
    this.loadSuppliers();

    // Get data from parent component
    this.serviceId = this.data.serviceId || 0;
    this.jobMainId = this.data.jobMainId || 0;
    this.isEditMode = this.serviceId !== 0;

    // Set jobMainId in form without emitting valueChanges
    if (this.jobMainId > 0) {
      this.jobServiceForm.patchValue({ jobMainId: this.jobMainId }, { emitEvent: false });
    }

    if (this.isEditMode) {
      this.loadJobService();
    }

    // Initialize lastDateStart from current control value (if any)
    const dateStartControl = this.jobServiceForm.get('dateStart');
    const dateEndControl = this.jobServiceForm.get('dateEnd');

    if (dateStartControl) {
      const initial = dateStartControl.value;
      this.lastDateStart = initial ? (initial instanceof Date ? initial : new Date(initial)) : null;
    }

    // When Date Start changes, ensure Date End is at least the same date
    if (dateStartControl && dateEndControl) {
      this.dateStartSub = dateStartControl.valueChanges.subscribe((newStart: any) => {
        if (!newStart) {
          // update lastDateStart and exit
          this.lastDateStart = null;
          return;
        }

        // Normalize values to Date objects for comparison
        const startDate = newStart instanceof Date ? newStart : new Date(newStart);
        const endVal = dateEndControl.value;
        const endDate = endVal ? (endVal instanceof Date ? endVal : new Date(endVal)) : null;

        let reason: string | null = null;

        // If previously dateStart and dateEnd were equal, update end to match new start
        const prevStart = this.lastDateStart;
        if (prevStart && endDate && prevStart.getTime() === endDate.getTime()) {
          dateEndControl.setValue(startDate, { emitEvent: false });
          reason = 'Date End matched previous Date Start and was updated to remain equal.';
        } else {
          // Otherwise if end is null or earlier than start, set end to the same as start
          if (!endDate) {
            dateEndControl.setValue(startDate, { emitEvent: false });
            reason = 'Date End was empty and was set to Date Start.';
          } else if (endDate.getTime() < startDate.getTime()) {
            dateEndControl.setValue(startDate, { emitEvent: false });
            reason = 'Date End was earlier than Date Start and was adjusted.';
          }
        }

        // Show snackbar if we changed dateEnd
        if (reason) {
          const display = startDate.toLocaleDateString();
          this.snackBar.open(`Date End set to ${display}: ${reason}`, 'Dismiss', { duration: 6000 });
        }

        // Update lastDateStart for next change
        this.lastDateStart = startDate;
      });
    }
  }

  ngOnDestroy(): void {
    this.dateStartSub?.unsubscribe();
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    if (this.jobServiceForm.valid) {
      this.onSubmit();
    } else {
      console.log('Form validation errors:', this.jobServiceForm.errors);
      Object.keys(this.jobServiceForm.controls).forEach(key => {
        const control = this.jobServiceForm.get(key);
        if (control?.invalid) {
          console.log(`Field ${key} errors:`, control.errors);
        }
      });
      alert('Please fill in all required fields');
    }
  }

  onSubmit() {
    if (this.jobServiceForm.valid) {
      const formValue = this.jobServiceForm.value;
      
      // Create the payload matching the backend model
      const jobService: any = {
        jobMainId: formValue.jobMainId,
        particulars: formValue.particulars || null,
        dateStart: formValue.dateStart ? new Date(formValue.dateStart).toISOString() : null,
        dateEnd: formValue.dateEnd ? new Date(formValue.dateEnd).toISOString() : null,
        quotedAmt: formValue.quotedAmt || 0,
        supplierAmt: formValue.supplierAmt || 0,
        createdBy: formValue.createdBy || 'System',
        createdOn: new Date().toISOString(),
        lastEditBy: 'System',
        lastEditOn: new Date().toISOString(),
        isArchived: formValue.isArchived || false,
        isPrivate: formValue.isPrivate || false,
        isActive: formValue.isActive !== false,
        serviceItemId: formValue.serviceItemId || null,
        supplierId: formValue.supplierId || null,
        itemStatusId: formValue.itemStatusId || null,
        sortOrder: formValue.sortOrder || 0
      };

      // For edit mode, include the ID
      if (this.isEditMode) {
        jobService.id = this.serviceId;
        jobService.createdBy = formValue.createdBy;
        jobService.createdOn = formValue.createdOn;
      }

      console.log('Submitting job service:', jobService);

      if (this.isEditMode) {
        this.apiService.updateJobService(this.serviceId, jobService).subscribe({
          next: () => {
            console.log('Service updated successfully');
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Update error:', error);
            const errorMessage = error.error?.title || error.error?.message || error.message || 'Unknown error';
            alert('Error updating service: ' + errorMessage);
          }
        });
      } else {
        // For create, don't send the ID field
        delete jobService.id;
        
        this.apiService.createJobService(jobService).subscribe({
          next: () => {
            console.log('Service created successfully');
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Create error:', error);
            console.error('Error details:', error.error);
            const errorMessage = error.error?.title || error.error?.message || error.message || 'Unknown error';
            alert('Error creating service: ' + errorMessage);
          }
        });
      }
    } else {
      alert('Please fill in all required fields');
    }
  }

  private loadJobService() {
    this.apiService.getJobService(this.serviceId)
      .pipe(
        catchError(err => {
          this.loadError = true;
          return [];
        })
      )
      .subscribe({
        next: (service: JobService) => {
          let _dateStart: Date | null = service.dateStart ? new Date(service.dateStart) : null;
          let _dateEnd: Date | null = service.dateEnd ? new Date(service.dateEnd) : null;

          this.jobServiceForm.patchValue({
            id: service.id,
            jobMainId: service.jobMainId,
            particulars: service.particulars,
            dateStart: _dateStart,
            dateEnd: _dateEnd,
            quotedAmt: service.quotedAmt,
            supplierAmt: service.supplierAmt,
            createdBy: service.createdBy,
            createdOn: service.createdOn,
            lastEditBy: service.lastEditBy,
            lastEditOn: service.lastEditOn,
            isArchived: service.isArchived,
            isPrivate: service.isPrivate,
            isActive: service.isActive,
            serviceItemId: service.serviceItemId,
            supplierId: service.supplierId,
            itemStatusId: service.itemStatusId,
            sortOrder: service.sortOrder
          }, { emitEvent: false });

          // store lastDateStart so we can detect previous equality with dateEnd
          this.lastDateStart = _dateStart;
        },
        error: (error) => {
          this.loadError = true;
          console.error('Load error:', error);
        }
      });
  }

  private loadServiceItems() {
    this.apiServiceLookup.getServiceItems()
      .subscribe({
        next: (items: any[]) => {
          this.serviceItems = items;
        },
        error: (error) => {
          this.loadError = true;
          console.error('Service Items Load error:', error);
        }
      });
  }

  private loadItemStatuses() {
    this.apiServiceLookup.getItemStatuses()
      .subscribe({
        next: (items: any[]) => {
          this.itemStatuses = items;
        },
        error: (error) => {
          this.loadError = true;
          console.error('Statuses Load error:', error);
        }
      })
  }

  private loadSuppliers() {
    this.apiEntityService.getEntities()
      .subscribe({
        next: (items: any[]) => {
          // Filter entities that are suppliers (you may need to adjust based on your entity type)
          this.suppliers = items;
        },
        error: (error) => {
          this.loadError = true;
          console.error('Suppliers Load error:', error);
        }
      })
  }

}

