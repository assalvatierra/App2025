import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiJobServiceBudgetService } from '../../../../core/services/api-job-service-budget.service';
import { JobServiceBudget } from '../../../../core/models/job-service-budget.model';

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
    debugger;
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
    console.log('Add budget clicked');
    // TODO: Implement add budget dialog
  }

  onEdit(budget: JobServiceBudget): void {
    console.log('Edit budget:', budget);
    // TODO: Implement edit budget dialog
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
}
