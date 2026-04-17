import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ApiEntityService } from '../../../core/services/api-entity.service';

export interface AddEntityDialogData {
  resourceId: number;
  resourceName: string;
}

@Component({
  selector: 'app-add-entity-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './add-entity-dialog.component.html',
  styleUrls: ['./add-entity-dialog.component.css']
})
export class AddEntityDialogComponent implements OnInit {
  entityForm: FormGroup;
  availableEntities: any[] = [];
  selectedEntity: any = null;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEntityDialogData,
    private apiEntityService: ApiEntityService
  ) {
    this.entityForm = this.fb.group({
      entityId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEntities();
  }

  private loadEntities(): void {
    this.loading = true;
    this.apiEntityService.getEntities().subscribe({
      next: (entities) => {
        // Filter out entities that are already associated (if needed)
        this.availableEntities = entities.filter(e => e.isActive && !e.isArchived);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading entities:', err);
        this.loading = false;
      }
    });
  }

  onEntitySelected(entityId: number): void {
    this.selectedEntity = this.availableEntities.find(e => e.id === entityId);
  }

  getEntityStatus(): string {
    if (!this.selectedEntity) {
      return '';
    }
    
    // Check if entity has status information
    if (this.selectedEntity.entityStatus && this.selectedEntity.entityStatus.name) {
      return this.selectedEntity.entityStatus.name;
    }
    
    // Fallback to active status
    return this.selectedEntity.isActive ? 'Active' : 'Inactive';
  }

  onSave(): void {
    if (this.entityForm.valid) {
      const result = {
        resourceId: this.data.resourceId,
        entityId: this.entityForm.value.entityId
      };
      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
