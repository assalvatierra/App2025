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
import { ApiJobServiceRequirementService, JobServiceRequirement } from '../../../../../core/services/api-job-service-requirement.service';
import { ApiService } from '../../../../../core/api.service';

export interface ServiceRequirementsDialogData {
  jobServiceId: number;
  serviceName: string;
}

@Component({
  selector: 'app-job-service-requirements-dialog',
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
  templateUrl: './job-service-requirements-dialog.component.html',
  styleUrls: ['./job-service-requirements-dialog.component.css']
})
export class JobServiceRequirementsDialogComponent implements OnInit {
  requirementForm: FormGroup;
  requirements: JobServiceRequirement[] = [];
  itemTypes: any[] = [];
  loading: boolean = false;
  showForm: boolean = false;
  isEditMode: boolean = false;
  editingRequirementId: number | null = null;
  displayedColumns: string[] = ['itemType', 'requiredQty', 'notes', 'actions'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobServiceRequirementsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceRequirementsDialogData,
    private apiRequirementService: ApiJobServiceRequirementService,
    private apiService: ApiService
  ) {
    this.requirementForm = this.fb.group({
      requiredQty: [1, [Validators.required, Validators.min(1)]],
      itemTypeId: [null],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadItemTypes();
    this.loadRequirements();
  }

  private loadItemTypes(): void {
    // Load only ItemTypes with className 'Resource'
    this.apiService.getItemTypesByClassName('Resource').subscribe({
      next: (types) => {
        this.itemTypes = types;
        console.log('Resource ItemTypes loaded:', types);
      },
      error: (err) => {
        console.error('Error loading resource item types:', err);
      }
    });
  }

  private loadRequirements(): void {
    this.loading = true;
    this.apiRequirementService.getRequirementsByJobService(this.data.jobServiceId).subscribe({
      next: (requirements) => {
        this.requirements = requirements;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading requirements:', err);
        this.loading = false;
      }
    });
  }

  onShowForm(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.resetForm();
  }

  onSubmitRequirement(): void {
    if (this.requirementForm.valid) {
      const requirement: JobServiceRequirement = {
        id: 0,
        jobServiceId: this.data.jobServiceId,
        requiredQty: this.requirementForm.value.requiredQty,
        itemTypeId: this.requirementForm.value.itemTypeId || null,
        notes: this.requirementForm.value.notes || null
      };

      if (this.isEditMode && this.editingRequirementId) {
        requirement.id = this.editingRequirementId;
        this.apiRequirementService.updateJobServiceRequirement(this.editingRequirementId, requirement).subscribe({
          next: () => {
            this.loadRequirements();
            this.hideForm();
          },
          error: (err) => {
            console.error('Error updating requirement:', err);
            alert('Error updating requirement. Please try again.');
          }
        });
      } else {
        this.apiRequirementService.createJobServiceRequirement(requirement).subscribe({
          next: () => {
            this.loadRequirements();
            this.hideForm();
          },
          error: (err) => {
            console.error('Error creating requirement:', err);
            alert('Error creating requirement. Please try again.');
          }
        });
      }
    }
  }

  onEditRequirement(requirement: JobServiceRequirement): void {
    this.showForm = true;
    this.isEditMode = true;
    this.editingRequirementId = requirement.id;
    this.requirementForm.patchValue({
      requiredQty: requirement.requiredQty,
      itemTypeId: requirement.itemTypeId,
      notes: requirement.notes
    });
  }

  onDeleteRequirement(id: number): void {
    if (confirm('Are you sure you want to delete this requirement?')) {
      this.apiRequirementService.deleteJobServiceRequirement(id).subscribe({
        next: () => {
          this.loadRequirements();
        },
        error: (err) => {
          console.error('Error deleting requirement:', err);
          alert('Error deleting requirement. Please try again.');
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

  getItemTypeName(itemTypeId: number | null | undefined): string {
    if (!itemTypeId) return 'N/A';
    const itemType = this.itemTypes.find(t => t.id === itemTypeId);
    return itemType ? itemType.name : 'N/A';
  }

  private hideForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  private resetForm(): void {
    this.isEditMode = false;
    this.editingRequirementId = null;
    this.requirementForm.reset({
      requiredQty: 1,
      itemTypeId: null,
      notes: ''
    });
  }
}
