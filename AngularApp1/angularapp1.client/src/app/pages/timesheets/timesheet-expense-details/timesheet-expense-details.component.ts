import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiTimesheetsService } from '../../../core/services/api-timesheets.service';
import { TimesheetExpenseDetail } from '../../../core/models/timesheet.model';

@Component({
  selector: 'app-timesheet-expense-details',
  standalone: true,
  templateUrl: './timesheet-expense-details.component.html',
  styleUrls: ['./timesheet-expense-details.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class TimesheetExpenseDetailsComponent implements OnChanges {
  @Input() timesheetId!: number;

  public expenseForm!: FormGroup;
  public loading: boolean = false;
  public saving: boolean = false;
  public saveSuccess: boolean = false;
  public hasData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiTimesheets: ApiTimesheetsService
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['timesheetId'] && this.timesheetId) {
      this.loadExpenseDetail();
    }
  }

  private initForm(): void {
    this.expenseForm = this.fb.group({
      billAmount: [null],
      additionalBillAmount: [null],
      resourceRate: [null],
      additionalRate: [null],
      resourceRate1: [null],
      additionalRate1: [null],
      regularExpense: [null],
      otherExpense: [null],
      discount: [null],
      amountRemarks: ['']
    });
  }

  private loadExpenseDetail(): void {
    this.loading = true;
    this.saveSuccess = false;
    this.apiTimesheets.getExpenseDetail(this.timesheetId).subscribe({
      next: (detail) => {
        if (detail) {
          this.hasData = true;
          this.expenseForm.patchValue({
            billAmount: detail.billAmount ?? null,
            additionalBillAmount: detail.additionalBillAmount ?? null,
            resourceRate: detail.resourceRate ?? null,
            additionalRate: detail.additionalRate ?? null,
            resourceRate1: detail.resourceRate1 ?? null,
            additionalRate1: detail.additionalRate1 ?? null,
            regularExpense: detail.regularExpense ?? null,
            otherExpense: detail.otherExpense ?? null,
            discount: detail.discount ?? null,
            amountRemarks: detail.amountRemarks ?? ''
          });
        } else {
          this.hasData = false;
          this.expenseForm.reset();
        }
        this.loading = false;
      },
      error: (err) => {
        // 404 = no record yet, that's fine
        if (err.status === 404) {
          this.hasData = false;
          this.expenseForm.reset();
        } else {
          console.error('Error loading expense detail:', err);
        }
        this.loading = false;
      }
    });
  }

  onSave(): void {
    if (!this.timesheetId) return;
    this.saving = true;
    this.saveSuccess = false;

    const formValue = this.expenseForm.value;
    const detail: TimesheetExpenseDetail = {
      id: this.timesheetId,
      billAmount: formValue.billAmount != null ? formValue.billAmount : undefined,
      additionalBillAmount: formValue.additionalBillAmount != null ? formValue.additionalBillAmount : undefined,
      resourceRate: formValue.resourceRate != null ? formValue.resourceRate : undefined,
      additionalRate: formValue.additionalRate != null ? formValue.additionalRate : undefined,
      resourceRate1: formValue.resourceRate1 != null ? formValue.resourceRate1 : undefined,
      additionalRate1: formValue.additionalRate1 != null ? formValue.additionalRate1 : undefined,
      regularExpense: formValue.regularExpense != null ? formValue.regularExpense : undefined,
      otherExpense: formValue.otherExpense != null ? formValue.otherExpense : undefined,
      discount: formValue.discount != null ? formValue.discount : undefined,
      amountRemarks: formValue.amountRemarks || undefined
    };

    this.apiTimesheets.upsertExpenseDetail(this.timesheetId, detail).subscribe({
      next: () => {
        this.saving = false;
        this.saveSuccess = true;
        this.hasData = true;
      },
      error: (err) => {
        console.error('Error saving expense detail:', err);
        this.saving = false;
      }
    });
  }
}
