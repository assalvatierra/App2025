import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiJobServiceService, JobService } from '../../../core/services/api-job-service.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-job-service-form',
  standalone: false, // Explicitly set to false
  templateUrl: './job-service-form.component.html',
  styleUrls: ['./job-service-form.component.css']
})
export class JobServiceFormComponent implements OnInit {
  jobServiceForm: FormGroup;
  isEditMode: boolean = false;
  serviceId: number = 0;
  loadError: boolean = false; // Added to handle load errors

  public itemStatuses: any[] = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Completed' },
    { id: 4, name: 'Cancelled' }   
  ]


  constructor(
    private fb: FormBuilder,
    private apiService: ApiJobServiceService,
    private route: ActivatedRoute,
    public router: Router  // Changed from private to public
  ) {
    this.jobServiceForm = this.fb.group({
      id: [0],
      jobMainId: [null, Validators.required],
      particulars: [''],
      dateStart: [null],
      dateEnd: [null],
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
      serviceItem: [null], 
      supplierId: [null],
      itemStatusId: [null],
      sortOrder: [0],

      // Add or remove controls to match the new JobService definition
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serviceId = +params['id'];
      this.isEditMode = this.serviceId !== 0;
      if (this.isEditMode) {
        this.loadJobService();
      }
    });
  }

  onSubmit() {
    if (this.jobServiceForm.valid) {
      const jobService = this.jobServiceForm.value;
      if (this.isEditMode) {
        this.apiService.updateJobService(this.serviceId, jobService).subscribe({
          next: () => this.router.navigate(['/job-service']),
          error: (error) => console.error('Update error:', error)
        });
      } else {
        this.apiService.createJobService(jobService).subscribe({
          next: () => this.router.navigate(['/job-service']),
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
          this.jobServiceForm.patchValue({
            id: service.id,
            jobMainId: service.jobMainId,
            particulars: service.particulars,
            dateStart: service.dateStart,
            dateEnd: service.dateEnd,
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
            serviceItem: service.serviceItem,
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
}
