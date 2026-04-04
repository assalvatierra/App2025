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
import { JobExpense } from '../../../core/models/expense.model';
import { ExpenseDataService } from '../expense-service/expense-data.service';

@Component({
  selector: 'app-expense-job-list',
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
  templateUrl: './expense-job-list.component.html',
  styleUrls: ['./expense-job-list.component.css']
})
export class ExpenseJobListComponent implements OnInit, OnChanges {
  @Input() expenseId: number | null = null;
  @Input() jobs: any[] = [];

  jobExpenses: JobExpense[] = [];
  jobExpenseForm!: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showForm: boolean = false;

  displayedColumns: string[] = ['job', 'description', 'actions'];

  constructor(
    private fb: FormBuilder,
    private dataService: ExpenseDataService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadJobExpenses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenseId'] && !changes['expenseId'].firstChange) {
      this.loadJobExpenses();
    }
  }

  private initForm(): void {
    this.jobExpenseForm = this.fb.group({
      id: [null],
      expensesId: [null],
      jobMainId: [null, Validators.required],
      description: ['']
    });
  }

  loadJobExpenses(): void {
    if (this.expenseId) {
      this.dataService.getJobExpenses(this.expenseId).subscribe({
        next: (jobExpenses: JobExpense[]) => {
          this.jobExpenses = jobExpenses;
        },
        error: (error: any) => {
          console.error('Error loading job expenses:', error);
          this.showMessage('Error loading job expenses');
        }
      });
    }
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.editingId = null;
    this.jobExpenseForm.reset();
    this.jobExpenseForm.patchValue({
      expensesId: this.expenseId
    });
  }

  onEdit(jobExpense: JobExpense): void {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = jobExpense.id || null;
    this.jobExpenseForm.patchValue(jobExpense);
  }

  onDelete(jobExpense: JobExpense): void {
    if (confirm('Are you sure you want to delete this job expense?')) {
      if (jobExpense.id) {
        this.dataService.deleteJobExpense(jobExpense.id).subscribe({
          next: () => {
            this.showMessage('Job expense deleted successfully');
            this.loadJobExpenses();
          },
          error: (error: any) => {
            console.error('Error deleting job expense:', error);
            this.showMessage('Error deleting job expense');
          }
        });
      }
    }
  }

  onSubmit(): void {
    if (this.jobExpenseForm.valid) {
      const jobExpense: JobExpense = this.jobExpenseForm.value;
      jobExpense.expensesId = this.expenseId || undefined;

      if (this.isEditing && this.editingId) {
        this.dataService.updateJobExpense(this.editingId, jobExpense).subscribe({
          next: () => {
            this.showMessage('Job expense updated successfully');
            this.loadJobExpenses();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error updating job expense:', error);
            this.showMessage('Error updating job expense');
          }
        });
      } else {
        const { id, ...jobExpenseData } = jobExpense;
        this.dataService.addJobExpense(jobExpenseData as JobExpense).subscribe({
          next: () => {
            this.showMessage('Job expense added successfully');
            this.loadJobExpenses();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error adding job expense:', error);
            this.showMessage('Error adding job expense');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.isEditing = false;
    this.editingId = null;
    this.jobExpenseForm.reset();
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
