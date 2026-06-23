import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiJobServiceBudgetService } from '../../../../core/services/api-job-service-budget.service';
import { JobServiceBudget } from '../../../../core/models/job-service-budget.model';
import { JobServiceBudgetDialogComponent } from './job-service-budget-dialog/job-service-budget-dialog.component';

@Component({
  selector: 'app-job-service-budget',
  standalone: false,
  templateUrl: './job-service-budget.component.html',
  styleUrls: ['./job-service-budget.component.css']
})
export class JobServiceBudgetComponent implements OnInit, OnChanges {
  @Input() jobMainId!: number;

  public dataloading: boolean = false;
  public budgets: JobServiceBudget[] = [];
  public displayColumns: string[] = ['id', 'jobServiceId', 'amount', 'remarks', 'itemTypeId', 'itemStatusId', 'actions'];
  public totalBudget: number = 0;

  constructor(
    private apiService: ApiJobServiceBudgetService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBudgets();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobMainId'] && !changes['jobMainId'].firstChange) {
      this.loadBudgets();
    }
  }

  loadBudgets(): void {
    if (!this.jobMainId || this.jobMainId === 0) {
      console.log('No valid jobMainId provided');
      this.budgets = [];
      this.totalBudget = 0;
      return;
    }
    this.dataloading = true;
    this.apiService.getJobServiceBudgetsByJobId(this.jobMainId).subscribe({
      next: (data) => {
        this.budgets = data;
        this.calculateTotalBudget();
        this.dataloading = false;
        console.log('Budgets loaded:', data);
      },
      error: (err) => {
        console.error('Error loading budgets:', err);
        this.dataloading = false;
        this.budgets = [];
        this.totalBudget = 0;
      }
    });
  }

  calculateTotalBudget(): void {
    this.totalBudget = this.budgets.reduce((sum, budget) => sum + (budget.amount || 0), 0);
  }

  onAddRecord(): void {
    this.openAddDialog();
  }

  onEdit(budget: JobServiceBudget): void {
    this.openEditDialog(budget);
  }

  onDelete(budget: JobServiceBudget): void {
    if (confirm(`Are you sure you want to delete this budget item (ID: ${budget.id})?`)) {
      this.apiService.deleteJobServiceBudget(budget.id).subscribe({
        next: () => {
          console.log('Budget deleted successfully');
          this.loadBudgets();
        },
        error: (err) => {
          console.error('Error deleting budget:', err);
          alert('Failed to delete budget. Please try again.');
        }
      });
    }
  }

  private openAddDialog(): void {
    const dialogRef = this.dialog.open(JobServiceBudgetDialogComponent, {
      width: '700px',
      data: {
        budgetId: 0,
        jobMainId: this.jobMainId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Budget added, reloading list');
        this.loadBudgets();
      }
    });
  }

  private openEditDialog(budget: JobServiceBudget): void {
    const dialogRef = this.dialog.open(JobServiceBudgetDialogComponent, {
      width: '700px',
      data: {
        budgetId: budget.id,
        jobMainId: this.jobMainId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Budget updated, reloading list');
        this.loadBudgets();
      }
    });
  }
}
