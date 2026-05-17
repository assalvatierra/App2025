import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiPayPeriodsService } from '../../../core/services/api-pay-periods.service';
import { ApiService } from '../../../core/api.service';
import { PayPeriod } from '../../../core/models/pay-period.model';
import { PayExpense } from '../../../core/models/pay-expense.model';
import { PayAddition } from '../../../core/models/pay-addition.model';
import { Timesheet } from '../../../core/models/timesheet.model';
import { PayPeriodTimesheetComponent } from './pay-period-timesheet/pay-period-timesheet.component';
import { PayPeriodAdditionsComponent } from './pay-period-additions/pay-period-additions.component';
import { PayPeriodResourceListComponent } from './pay-period-resource-list/pay-period-resource-list.component';

@Component({
  selector: 'app-pay-period-form',
  standalone: true,
  templateUrl: './pay-period-form.component.html',
  styleUrls: ['./pay-period-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSnackBarModule,
    PayPeriodTimesheetComponent,
    PayPeriodAdditionsComponent,
    PayPeriodResourceListComponent
  ]
})
export class PayPeriodFormComponent implements AfterViewInit {
  public payPeriodForm!: FormGroup;
  public currentData: PayPeriod | null = null;
  public dataloading: boolean = true;
  public paramId: number = 0;
  public showAddBtn: boolean = false;
  public titleInfo: string = 'Pay Period Details';

  // Lookup data
  public statuses: any[] = [];
  public itemTypes: any[] = [];

  // Linked expenses
  public linkedExpenses: PayExpense[] = [];
  public expensesLoading: boolean = false;

  // Linked timesheets
  public linkedTimesheets: Timesheet[] = [];
  public timesheetsLoading: boolean = false;

  // Linked additions
  public linkedAdditions: PayAddition[] = [];
  public additionsLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiPayPeriods: ApiPayPeriodsService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    // Load lookup data
    this.loadLookupData();

    if (this.paramId !== 0) {
      this.titleInfo = 'Edit Pay Period';
      this.retrieveApiData(this.paramId);
      this.loadLinkedExpenses(this.paramId);
      this.loadLinkedTimesheets(this.paramId);
      this.loadLinkedAdditions(this.paramId);
    } else {
      this.titleInfo = 'Add New Pay Period';
      this.setDefaultData();
      this.dataloading = false;
      this.showAddBtn = true;
    }
  }

  private initForm(): void {
    this.payPeriodForm = this.fb.group({
      dateFrom: [new Date(), Validators.required],
      dateTo: [new Date(new Date().setDate(new Date().getDate() + 14)), Validators.required],
      payDate: [new Date(new Date().setDate(new Date().getDate() + 21)), Validators.required],
      notes: [''],
      itemStatusId: [null],
      itemTypeId: [null],
      isActive: [true],
      isPrivate: [false],
      isArchived: [false]
    });
  }

  /* Event Handlers */
  onSubmit(): void {
    if (this.payPeriodForm.valid) {
      this.updateCurrentDataValues();
      this.updateApiData(this.paramId, this.currentData!);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
    }
  }

  onAdd(): void {
    if (this.payPeriodForm.valid) {
      this.updateCurrentDataValues();
      this.addApiData(this.currentData!);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
    }
  }

  onCancel(): void {
    this.router.navigate(['/timesheets/pay-periods']);
  }

  onAdditionsChanged(): void {
    console.log('Additions changed - refreshing data');
    if (this.paramId !== 0) {
      this.loadLinkedAdditions(this.paramId);
    }
  }

  /* Data Methods */
  private loadLookupData(): void {
    // Load item statuses
    this.apiService.getItemStatusesByClassName('PayPeriod').subscribe({
      next: (res: any) => {
        this.statuses = res || [];
      },
      error: (err) => {
        console.error('Error loading statuses:', err);
        // Fallback to all statuses if className filter doesn't work
        this.apiService.getItemStatuses().subscribe({
          next: (res: any) => {
            this.statuses = res || [];
          },
          error: (err) => {
            console.error('Error loading all statuses:', err);
          }
        });
      }
    });

    // Load item types
    this.apiService.getItemTypesByClassName('PayPeriod').subscribe({
      next: (res: any) => {
        this.itemTypes = res || [];
      },
      error: (err) => {
        console.error('Error loading item types:', err);
        // Fallback to all item types if className filter doesn't work
        this.apiService.getItemTypes().subscribe({
          next: (res: any) => {
            this.itemTypes = res || [];
          },
          error: (err) => {
            console.error('Error loading all item types:', err);
          }
        });
      }
    });
  }

  private setDefaultData(): void {
    this.currentData = {
      id: 0,
      createdBy: 'system',
      createdOn: new Date(),
      lastEditBy: 'system',
      lastEditOn: new Date(),
      isArchived: false,
      isPrivate: false,
      isActive: true,
      dateFrom: new Date(),
      dateTo: new Date(new Date().setDate(new Date().getDate() + 14)),
      payDate: new Date(new Date().setDate(new Date().getDate() + 21)),
      notes: '',
      itemStatusId: undefined,
      itemTypeId: undefined
    };
  }

  private retrieveApiData(id: number): void {
    this.dataloading = true;
    this.apiPayPeriods.getPayPeriod(id).subscribe({
      next: (res: PayPeriod) => {
        this.currentData = res;
        this.updateFormValues(res);
        this.dataloading = false;
      },
      error: (err) => {
        console.error('Error loading pay period:', err);
        this.snackBar.open('Error loading pay period', 'Close', { duration: 3000 });
        this.dataloading = false;
      }
    });
  }

  private updateFormValues(data: PayPeriod): void {
    this.payPeriodForm.patchValue({
      dateFrom: this.parseDate(data.dateFrom),
      dateTo: this.parseDate(data.dateTo),
      payDate: this.parseDate(data.payDate),
      notes: data.notes,
      itemStatusId: data.itemStatusId,
      itemTypeId: data.itemTypeId,
      isActive: data.isActive,
      isPrivate: data.isPrivate,
      isArchived: data.isArchived
    });
  }

  private updateCurrentDataValues(): void {
    if (!this.currentData) {
      this.currentData = {} as PayPeriod;
    }

    const formValue = this.payPeriodForm.value;
    this.currentData.dateFrom = formValue.dateFrom;
    this.currentData.dateTo = formValue.dateTo;
    this.currentData.payDate = formValue.payDate;
    this.currentData.notes = formValue.notes;
    this.currentData.itemStatusId = formValue.itemStatusId;
    this.currentData.itemTypeId = formValue.itemTypeId;
    this.currentData.isActive = formValue.isActive;
    this.currentData.isPrivate = formValue.isPrivate;
    this.currentData.isArchived = formValue.isArchived;
    this.currentData.lastEditBy = 'system';
    this.currentData.lastEditOn = new Date();
  }

  private addApiData(data: PayPeriod): void {
    this.dataloading = true;
    const payPeriodData: any = {
      dateFrom: data.dateFrom ? this.toLocalISOString(data.dateFrom) : null,
      dateTo: data.dateTo ? this.toLocalISOString(data.dateTo) : null,
      payDate: data.payDate ? this.toLocalISOString(data.payDate) : null,
      notes: data.notes || '',
      itemStatusId: data.itemStatusId,
      itemTypeId: data.itemTypeId,
      isActive: data.isActive !== false,
      isPrivate: data.isPrivate || false,
      isArchived: data.isArchived || false,
      createdBy: 'system',
      createdOn: new Date().toISOString(),
      lastEditBy: 'system',
      lastEditOn: new Date().toISOString()
    };

    this.apiPayPeriods.addPayPeriod(payPeriodData).subscribe({
      next: (result) => {
        this.snackBar.open('Pay period added successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/timesheets/pay-periods']);
      },
      error: (error) => {
        console.error('Error adding pay period:', error);
        this.snackBar.open('Error adding pay period', 'Close', { duration: 3000 });
        this.dataloading = false;
      }
    });
  }

  private updateApiData(id: number, data: PayPeriod): void {
    this.dataloading = true;
    const payPeriodData: any = {
      id: id,
      dateFrom: data.dateFrom ? this.toLocalISOString(data.dateFrom) : null,
      dateTo: data.dateTo ? this.toLocalISOString(data.dateTo) : null,
      payDate: data.payDate ? this.toLocalISOString(data.payDate) : null,
      notes: data.notes || '',
      itemStatusId: data.itemStatusId,
      itemTypeId: data.itemTypeId,
      isActive: data.isActive !== false,
      isPrivate: data.isPrivate || false,
      isArchived: data.isArchived || false,
      createdBy: this.currentData?.createdBy || 'system',
      createdOn: this.currentData?.createdOn ? new Date(this.currentData.createdOn).toISOString() : new Date().toISOString(),
      lastEditBy: 'system',
      lastEditOn: new Date().toISOString()
    };

    this.apiPayPeriods.updatePayPeriod(id, payPeriodData).subscribe({
      next: (result) => {
        this.snackBar.open('Pay period updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/timesheets/pay-periods']);
      },
      error: (error) => {
        console.error('Error updating pay period:', error);
        this.snackBar.open('Error updating pay period', 'Close', { duration: 3000 });
        this.dataloading = false;
      }
    });
  }

  private parseDate(date: any): Date {
    if (date instanceof Date) {
      return date;
    }
    if (typeof date === 'string') {
      const match = date.match(/\/Date\((\d+)\)\//);
      if (match) {
        return new Date(parseInt(match[1]));
      }
      return new Date(date);
    }
    return new Date();
  }

  private toLocalISOString(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.payPeriodForm.controls).forEach(key => {
      const control = this.payPeriodForm.get(key);
      control?.markAsTouched();
    });
  }

  /* Linked Expenses Methods */
  private loadLinkedExpenses(payPeriodId: number): void {
    this.expensesLoading = true;
    this.apiPayPeriods.getPayPeriodExpenses(payPeriodId).subscribe({
      next: (expenses: PayExpense[]) => {
        this.linkedExpenses = expenses;
        this.expensesLoading = false;
      },
      error: (err) => {
        console.error('Error loading linked expenses:', err);
        this.expensesLoading = false;
      }
    });
  }

  /* Linked Timesheets Methods */
  private loadLinkedTimesheets(payPeriodId: number): void {
    this.timesheetsLoading = true;
    this.apiPayPeriods.getPayPeriodTimesheets(payPeriodId).subscribe({
      next: (timesheets: Timesheet[]) => {
        this.linkedTimesheets = timesheets;
        this.timesheetsLoading = false;
      },
      error: (err) => {
        console.error('Error loading linked timesheets:', err);
        this.timesheetsLoading = false;
      }
    });
  }

  /* Linked Additions Methods */
  private loadLinkedAdditions(payPeriodId: number): void {
    this.additionsLoading = true;
    this.apiPayPeriods.getPayPeriodAdditions(payPeriodId).subscribe({
      next: (additions: PayAddition[]) => {
        this.linkedAdditions = additions;
        this.additionsLoading = false;
      },
      error: (err) => {
        console.error('Error loading linked additions:', err);
        this.additionsLoading = false;
      }
    });
  }
}
