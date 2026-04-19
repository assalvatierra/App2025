import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { ApiJobServiceResourceService, JobServiceResource } from '../../../../../core/services/api-job-service-resource.service';
import { ApiResourcesService } from '../../../../../core/services/api-resources.service';
import { Resource } from '../../../../../core/models/timesheet.model';

export interface ServiceResourcesDialogData {
  jobServiceId: number;
  serviceName: string;
}

@Component({
  selector: 'app-job-service-resources-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule
  ],
  templateUrl: './job-service-resources-dialog.component.html',
  styleUrls: ['./job-service-resources-dialog.component.css']
})
export class JobServiceResourcesDialogComponent implements OnInit {
  resourceForm: FormGroup;
  jobServiceResources: JobServiceResource[] = [];
  availableResources: Resource[] = [];
  loading: boolean = false;
  showForm: boolean = false;
  isEditMode: boolean = false;
  editingResourceId: number | null = null;
  displayedColumns: string[] = ['resourceName', 'resourceCode', 'description', 'actions'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobServiceResourcesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceResourcesDialogData,
    private apiJobServiceResourceService: ApiJobServiceResourceService,
    private apiResourcesService: ApiResourcesService
  ) {
    this.resourceForm = this.fb.group({
      resourceId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAvailableResources();
    this.loadJobServiceResources();
  }

  private loadAvailableResources(): void {
    this.apiResourcesService.getActiveResources().subscribe({
      next: (resources) => {
        this.availableResources = resources;
        console.log('Available resources loaded:', resources);
      },
      error: (err) => {
        console.error('Error loading available resources:', err);
      }
    });
  }

  private loadJobServiceResources(): void {
    this.loading = true;
    this.apiJobServiceResourceService.getByJobService(this.data.jobServiceId).subscribe({
      next: (resources) => {
        this.jobServiceResources = resources;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading job service resources:', err);
        this.loading = false;
      }
    });
  }

  onShowForm(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.resetForm();
  }

  onSubmitResource(): void {
    if (this.resourceForm.valid) {
      const jobServiceResource: JobServiceResource = {
        id: 0,
        jobServiceId: this.data.jobServiceId,
        resourceId: this.resourceForm.value.resourceId
      };

      this.apiJobServiceResourceService.addJobServiceResource(jobServiceResource).subscribe({
        next: () => {
          this.loadJobServiceResources();
          this.hideForm();
        },
        error: (err) => {
          console.error('Error adding resource:', err);
          const errorMessage = err?.error?.message || 'Error adding resource. Please try again.';
          alert(errorMessage);
        }
      });
    }
  }

  onDeleteResource(id: number): void {
    if (confirm('Are you sure you want to remove this resource from the service?')) {
      this.apiJobServiceResourceService.deleteJobServiceResource(id).subscribe({
        next: () => {
          this.loadJobServiceResources();
        },
        error: (err) => {
          console.error('Error deleting resource:', err);
          alert('Error deleting resource. Please try again.');
        }
      });
    }
  }

  onCancelForm(): void {
    this.hideForm();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getResourceName(resourceId: number | null | undefined): string {
    if (!resourceId) return 'N/A';
    const resource = this.availableResources.find(r => r.id === resourceId);
    return resource ? resource.name : 'N/A';
  }

  getResourceCode(resourceId: number | null | undefined): string {
    if (!resourceId) return 'N/A';
    const resource = this.availableResources.find(r => r.id === resourceId);
    return resource ? resource.code || 'N/A' : 'N/A';
  }

  getResourceDescription(resourceId: number | null | undefined): string {
    if (!resourceId) return 'N/A';
    const resource = this.availableResources.find(r => r.id === resourceId);
    return resource ? resource.description || 'N/A' : 'N/A';
  }

  private hideForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  private resetForm(): void {
    this.isEditMode = false;
    this.editingResourceId = null;
    this.resourceForm.reset({
      resourceId: null
    });
  }
}
