import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { JobReceivable } from '../../../core/models/receivable.model';
import { ReceivableDataService } from '../receivable-service/receivable-data.service';

@Component({
  selector: 'app-receivable-job-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './receivable-job-list.component.html',
  styleUrls: ['./receivable-job-list.component.css']
})
export class ReceivableJobListComponent implements OnInit, OnChanges {
  @Input() receivableId: number | null = null;
  @Input() jobs: any[] = [];

  jobReceivables: JobReceivable[] = [];
  jobReceivableForm!: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showForm: boolean = false;

  displayedColumns: string[] = ['job', 'description', 'actions'];

  constructor(
    private fb: FormBuilder,
    private dataService: ReceivableDataService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadJobReceivables();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receivableId'] && !changes['receivableId'].firstChange) {
      this.loadJobReceivables();
    }
  }

  private initForm(): void {
    this.jobReceivableForm = this.fb.group({
      id: [null],
      receivablesId: [null],
      jobMainId: [null, Validators.required],
      description: ['']
    });
  }

  loadJobReceivables(): void {
    if (this.receivableId) {
      this.dataService.getJobReceivables(this.receivableId).subscribe({
        next: (jobReceivables: JobReceivable[]) => {
          this.jobReceivables = jobReceivables;
        },
        error: (error: any) => {
          console.error('Error loading job receivables:', error);
          this.showMessage('Error loading job receivables');
        }
      });
    }
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.editingId = null;
    this.jobReceivableForm.reset();
    this.jobReceivableForm.patchValue({
      receivablesId: this.receivableId
    });
  }

  onEdit(jobReceivable: JobReceivable): void {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = jobReceivable.id || null;
    this.jobReceivableForm.patchValue(jobReceivable);
  }

  onDelete(jobReceivable: JobReceivable): void {
    if (confirm('Are you sure you want to delete this job receivable?')) {
      if (jobReceivable.id) {
        this.dataService.deleteJobReceivable(jobReceivable.id).subscribe({
          next: () => {
            this.showMessage('Job receivable deleted successfully');
            this.loadJobReceivables();
          },
          error: (error: any) => {
            console.error('Error deleting job receivable:', error);
            this.showMessage('Error deleting job receivable');
          }
        });
      }
    }
  }

  onSubmit(): void {
    if (this.jobReceivableForm.valid) {
      const jobReceivable: JobReceivable = this.jobReceivableForm.value;
      jobReceivable.receivablesId = this.receivableId || undefined;

      if (this.isEditing && this.editingId) {
        this.dataService.updateJobReceivable(this.editingId, jobReceivable).subscribe({
          next: () => {
            this.showMessage('Job receivable updated successfully');
            this.loadJobReceivables();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error updating job receivable:', error);
            this.showMessage('Error updating job receivable');
          }
        });
      } else {
        const { id, ...jobReceivableData } = jobReceivable;
        this.dataService.addJobReceivable(jobReceivableData as JobReceivable).subscribe({
          next: () => {
            this.showMessage('Job receivable added successfully');
            this.loadJobReceivables();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error adding job receivable:', error);
            this.showMessage('Error adding job receivable');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.isEditing = false;
    this.editingId = null;
    this.jobReceivableForm.reset();
  }

  getJobDescription(jobMainId: number | undefined): string {
    if (!jobMainId) return 'N/A';
    const job = this.jobs.find(j => j.id === jobMainId);
    return job ? job.description : 'Unknown';
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
