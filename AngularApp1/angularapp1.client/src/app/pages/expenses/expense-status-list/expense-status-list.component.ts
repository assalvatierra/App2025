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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ExpenseStatus } from '../../../core/models/expense.model';
import { ExpenseDataService } from '../expense-service/expense-data.service';

@Component({
  selector: 'app-expense-status-list',
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './expense-status-list.component.html',
  styleUrls: ['./expense-status-list.component.css']
})
export class ExpenseStatusListComponent implements OnInit, OnChanges {
  @Input() expenseId: number | null = null;
  @Input() itemStatuses: any[] = [];

  statuses: ExpenseStatus[] = [];
  statusForm!: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showForm: boolean = false;

  displayedColumns: string[] = ['itemStatus', 'statusDate', 'remarks', 'actions'];

  constructor(
    private fb: FormBuilder,
    private dataService: ExpenseDataService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadStatuses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenseId'] && !changes['expenseId'].firstChange) {
      this.loadStatuses();
    }
  }

  private initForm(): void {
    this.statusForm = this.fb.group({
      id: [null],
      expenseId: [null],
      itemStatusId: [null, Validators.required],
      statusDate: [new Date(), Validators.required],
      remarks: ['']
    });
  }

  loadStatuses(): void {
    if (this.expenseId) {
      this.dataService.getExpenseStatuses(this.expenseId).subscribe({
        next: (statuses: ExpenseStatus[]) => {
          this.statuses = statuses;
        },
        error: (error: any) => {
          console.error('Error loading statuses:', error);
          this.showMessage('Error loading statuses');
        }
      });
    }
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.editingId = null;
    this.statusForm.reset();
    this.statusForm.patchValue({
      expenseId: this.expenseId,
      statusDate: new Date()
    });
  }

  onEdit(status: ExpenseStatus): void {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = status.id || null;
    this.statusForm.patchValue(status);
  }

  onDelete(status: ExpenseStatus): void {
    if (confirm('Are you sure you want to delete this status?')) {
      if (status.id && this.expenseId) {
        // Re-add without deleted status (API delete not yet exposed; reload after)
        this.showMessage('Delete not yet supported via API. Contact admin.');
      }
    }
  }

  onSubmit(): void {
    if (this.statusForm.valid && this.expenseId) {
      const status: ExpenseStatus = this.statusForm.value;
      status.expenseId = this.expenseId;

      const { id, ...statusData } = status;
      this.dataService.addExpenseStatus(this.expenseId, statusData as ExpenseStatus).subscribe({
        next: () => {
          this.showMessage('Status added successfully');
          this.loadStatuses();
          this.onCancel();
        },
        error: (error: any) => {
          console.error('Error adding status:', error);
          this.showMessage('Error adding status');
        }
      });
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.isEditing = false;
    this.editingId = null;
    this.statusForm.reset();
  }

  getItemStatusName(itemStatusId: number | undefined): string {
    if (!itemStatusId) return 'N/A';
    const itemStatus = this.itemStatuses.find(s => s.id === itemStatusId);
    return itemStatus ? itemStatus.name : 'Unknown';
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
