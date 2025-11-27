import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiJobServiceService, JobService } from '../../../../../core/services/api-job-service.service';
import { catchError } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // If you're passing data
import { ApiService } from '../../../../../core/api.service';

@Component({
  selector: 'app-job-main-service-dialog',
  standalone: false,
  templateUrl: './job-main-service-dialog.component.html',
  styleUrl: './job-main-service-dialog.component.css'
})

export class JobMainServiceDialogComponent implements OnInit {

  jobServiceForm: FormGroup;
  isEditMode: boolean = false;
  serviceId: number = 0;
  loadError: boolean = false; // Added to handle load errors

  public itemStatuses: any[] = [];
  public serviceItems: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<JobMainServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // If you're receiving data
    private fb: FormBuilder,
    private apiService: ApiJobServiceService,
    private apiServiceLookup: ApiService,
    private route: ActivatedRoute,
    public router: Router  // Changed from private to public
  ) {
    this.jobServiceForm = this.fb.group({
      id: [0],
      jobMainId: [null, Validators.required],
      particulars: [''],
      dateStart: [''],
      dateEnd: [''],
      quotedAmt: [0],
      supplierAmt: [0],
      createdBy: [''],
      createdOn: [null],
      lastEditBy: [''],
      lastEditOn: [null],
      isArchived: [false],
      isPrivate: [false],
      isActive: [true],
      serviceItemId: [null],
      supplierId: [null],
      itemStatusId: [null],
      sortOrder: [0],
      // Add or remove controls to match the new JobService definition
    });
  }

  ngOnInit() {
    this.loadServiceItems();
    this.loadItemStatuses();

    this.route.params.subscribe(params => {
      this.serviceId = this.data.serviceId;
      this.isEditMode = this.serviceId !== 0;
      if (this.isEditMode) {
        this.loadJobService();
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close(); // Close without a result
  }

  onSaveClick(): void {
    this.onSubmit();
    this.dialogRef.close('Some result'); // Close with a result
  }


  onSubmit() {
    if (this.jobServiceForm.valid) {
      const jobService = this.jobServiceForm.value;
      if (this.isEditMode) {
        this.apiService.updateJobService(this.serviceId, jobService).subscribe({
          //next: () => this.router.navigate(['/job-service']),
          error: (error) => console.error('Update error:', error)
        });
      } else {
        this.apiService.createJobService(jobService).subscribe({
          //next: () => this.router.navigate(['/job-service']),
          error: (error) => console.error('Create error:', error)
        });
      }
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
          // Convert jobDate to date input format if needed
          let _dateStart: string | null = service.dateStart ? new Date(service.dateStart).toISOString().split('T')[0] : null;
          let _dateEnd: string | null = service.dateEnd ? new Date(service.dateEnd).toISOString().split('T')[0] : null;

          //let _dateStart = Date.now();

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
          });
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


}

