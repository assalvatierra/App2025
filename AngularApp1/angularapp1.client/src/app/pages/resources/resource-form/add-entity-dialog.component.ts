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
  template: `
    <h2 mat-dialog-title>Add Entity to {{ data.resourceName }}</h2>
    <mat-dialog-content>
      <form [formGroup]="entityForm" class="dialog-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Select Entity</mat-label>
          <mat-select formControlName="entityId" required (selectionChange)="onEntitySelected($event.value)">
            <mat-option *ngFor="let entity of availableEntities" [value]="entity.id">
              {{ entity.name }} ({{ entity.code }})
            </mat-option>
          </mat-select>
          <mat-error *ngIf="entityForm.get('entityId')?.hasError('required')">
            Entity is required
          </mat-error>
        </mat-form-field>

        <div *ngIf="selectedEntity" class="entity-details">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <textarea matInput 
                      [value]="selectedEntity.description || 'No description available'" 
                      readonly
                      rows="3"></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Remarks</mat-label>
            <textarea matInput 
                      [value]="selectedEntity.remarks || 'No remarks available'" 
                      readonly
                      rows="2"></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Status</mat-label>
            <input matInput 
                   [value]="getEntityStatus()" 
                   readonly>
          </mat-form-field>
        </div>
      </form>

      <div *ngIf="loading" class="loading-message">
        Loading entities...
      </div>

      <div *ngIf="!loading && availableEntities.length === 0" class="no-entities">
        No entities available to add.
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" 
              (click)="onSave()" 
              [disabled]="!entityForm.valid || loading">
        Add Entity
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: flex;
      flex-direction: column;
      min-width: 400px;
      padding: 16px 0;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    mat-dialog-content {
      min-height: 300px;
      max-height: 600px;
      overflow-y: auto;
    }

    .entity-details {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .entity-details mat-form-field {
      pointer-events: none;
    }

    .entity-details mat-form-field input,
    .entity-details mat-form-field textarea {
      color: rgba(0, 0, 0, 0.7);
    }

    .loading-message,
    .no-entities {
      text-align: center;
      padding: 24px;
      color: #666;
    }

    mat-dialog-actions {
      padding: 16px 24px;
    }
  `]
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
