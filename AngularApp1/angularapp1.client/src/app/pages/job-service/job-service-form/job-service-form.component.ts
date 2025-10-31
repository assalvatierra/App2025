import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiJobServiceService, JobService } from '../../../core/services/api-job-service.service';

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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiJobServiceService,
    private route: ActivatedRoute,
    public router: Router  // Changed from private to public
  ) {
    this.jobServiceForm = this.createForm();
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

  private createForm(): FormGroup {
    return this.fb.group({
      jobId: ['', Validators.required],
      serviceDate: ['', Validators.required],
      description: ['', Validators.required],
      serviceTypeId: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]],
      statusId: ['', Validators.required]
    });
  }

  private loadJobService() {
    this.apiService.getJobService(this.serviceId).subscribe({
      next: (service: JobService) => {
        this.jobServiceForm.patchValue({
          jobId: service.jobId,
          serviceDate: service.serviceDate,
          description: service.description,
          serviceTypeId: service.serviceTypeId,
          cost: service.cost,
          statusId: service.statusId
        });
      },
      error: (error) => console.error('Load error:', error)
    });
  }
}
