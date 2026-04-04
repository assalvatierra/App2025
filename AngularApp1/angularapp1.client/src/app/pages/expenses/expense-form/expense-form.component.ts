import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';
import { Expense } from '../../../core/models/expense.model';
import { ExpenseStatusListComponent } from '../expense-status-list/expense-status-list.component';
import { ExpenseJobListComponent } from '../expense-job-list/expense-job-list.component';
import { ApiService } from '../../../core/api.service';
import { ApiJobMainService } from '../../../core/services/api-job-main.service';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    UiPageTitleComponent,
    ExpenseStatusListComponent,
    ExpenseJobListComponent
  ]
})
export class ExpenseFormComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() expense: Expense | null = null;
  @Input() entities: any[] = [];
  @Input() dataloading: boolean = false;

  @Output() saveRecordClicked = new EventEmitter<Expense>();
  @Output() cancelClicked = new EventEmitter<void>();

  public expenseForm!: FormGroup;
  public currentData: Expense | null = null;
  public isNewRecord: boolean = true;
  public titleInfo: string = 'Add Expense';
  public itemStatuses: any[] = [];
  public jobs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private apiJobMain: ApiJobMainService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadItemStatuses();
    this.loadJobs();
    this.updateFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expense'] && !changes['expense'].firstChange) {
      this.updateFormData();
    }
  }

  ngAfterViewInit(): void { }

  private updateFormData(): void {
    if (this.expense) {
      this.currentData = this.expense;
      this.isNewRecord = false;
      this.titleInfo = 'Edit Expense';
      this.populateForm();
    } else {
      this.isNewRecord = true;
      this.titleInfo = 'Add Expense';
      this.expenseForm.reset({
        id: null,
        trxDate: this.formatDateForInput(new Date()),
        amount: 0,
        entityId: null,
        remarks: '',
        isActive: true,
        isArchived: false,
        isPrivate: false,
        createdBy: 'System',
        lastEditBy: 'System'
      });
      this.currentData = null;
    }
  }

  private loadItemStatuses(): void {
    this.apiService.getItemStatusesByClassName('Expense').subscribe({
      next: (statuses: any[]) => {
        console.log('Item statuses loaded:', statuses);
        this.itemStatuses = statuses;
      },
      error: (err: any) => {
        console.error('Error loading item statuses:', err);
      }
    });
  }

  private loadJobs(): void {
    this.apiJobMain.getJobMains().subscribe({
      next: (jobs: any[]) => {
        this.jobs = jobs;
      },
      error: (err: any) => {
        console.error('Error loading jobs:', err);
      }
    });
  }

  private initForm(): void {
    this.expenseForm = this.fb.group({
      id: [null],
      trxDate: [this.formatDateForInput(new Date()), Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      entityId: [null],
      remarks: [''],
      isActive: [true],
      isArchived: [false],
      isPrivate: [false],
      createdBy: ['System'],
      lastEditBy: ['System']
    });
  }

  private populateForm(): void {
    if (this.currentData) {
      this.expenseForm.patchValue({
        id: this.currentData.id,
        trxDate: this.currentData.trxDate ? this.formatDateForInput(this.currentData.trxDate) : '',
        amount: this.currentData.amount,
        entityId: this.currentData.entityId,
        remarks: this.currentData.remarks || '',
        isActive: this.currentData.isActive,
        isArchived: this.currentData.isArchived,
        isPrivate: this.currentData.isPrivate,
        createdBy: this.currentData.createdBy || 'System',
        lastEditBy: this.currentData.lastEditBy || 'System'
      });
    }
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const formValue = this.expenseForm.value;
      const expense: Expense = {
        id: formValue.id,
        trxDate: new Date(formValue.trxDate),
        amount: parseFloat(formValue.amount),
        entityId: formValue.entityId,
        remarks: formValue.remarks || '',
        isActive: formValue.isActive,
        isArchived: formValue.isArchived,
        isPrivate: formValue.isPrivate,
        createdBy: formValue.createdBy || 'System',
        lastEditBy: formValue.lastEditBy || 'System'
      };
      this.saveRecordClicked.emit(expense);
    }
  }

  onCancel(): void {
    this.cancelClicked.emit();
  }

  getEntityName(entityId: number): string {
    const entity = this.entities.find(e => e.id === entityId);
    return entity ? entity.name : 'Unknown';
  }
}
