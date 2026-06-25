import { Component, inject, OnInit, Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiResourceRatesService } from '../../../../core/services/api-resource-rates.service';
import { ResourceRate } from '../../../../core/models/resource-rate.model';

export interface ResourceRateDialogData {
  resourceId: number;
  resourceRate?: ResourceRate;
}

@Directive({
  selector: '[numberFormatter]',
  standalone: true
})
export class NumberFormatterDirective implements OnInit {
  @Input() numberFormatter: any;
  @Output() numberFormatterChange = new EventEmitter<number>();

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnInit() {
    this.format();
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement.value.replace(/,/g, '');
    const num = parseFloat(input);
    if (!isNaN(num)) {
      this.numberFormatterChange.emit(num);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    this.format();
  }

  private format() {
    if (this.numberFormatter != null && typeof this.numberFormatter === 'number') {
      this.el.nativeElement.value = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(this.numberFormatter);
    }
  }
}

@Component({
  selector: 'app-resource-rate-dialog',
  standalone: true,
  templateUrl: './resource-rate-dialog.component.html',
  styleUrls: ['./resource-rate-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NumberFormatterDirective
  ]
})
export class ResourceRateDialogComponent implements OnInit {
  public rateForm!: FormGroup;
  public isEdit: boolean = false;
  public loading: boolean = false;
  public data!: ResourceRateDialogData;

  constructor(
    private fb: FormBuilder,
    private apiResourceRatesService: ApiResourceRatesService,
    private dialogRef: MatDialogRef<ResourceRateDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.data = inject(MAT_DIALOG_DATA);
    this.initializeForm();
  }

  ngOnInit(): void {
    this.isEdit = !!this.data.resourceRate;
    if (this.isEdit && this.data.resourceRate) {
      this.rateForm.patchValue({
        validFrom: this.parseDate(this.data.resourceRate.validFrom),
        validTo: this.parseDate(this.data.resourceRate.validTo),
        daily: this.data.resourceRate.daily,
        hourly: this.data.resourceRate.hourly,
        monthly: this.data.resourceRate.monthly,
        percent: this.data.resourceRate.percent,
        otRate: this.data.resourceRate.otRate,
        itemPrice: this.data.resourceRate.itemPrice,
        isActive: this.data.resourceRate.isActive,
        isPrivate: this.data.resourceRate.isPrivate,
        isArchived: this.data.resourceRate.isArchived
      });
    }
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

  private initializeForm(): void {
    this.rateForm = this.fb.group({
      validFrom: [new Date(), Validators.required],
      validTo: [new Date(new Date().getFullYear() + 1, 11, 31), Validators.required],
      daily: [0, [Validators.required, Validators.min(0)]],
      hourly: [0, [Validators.required, Validators.min(0)]],
      monthly: [0, [Validators.required, Validators.min(0)]],
      percent: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      otRate: [0, [Validators.required, Validators.min(0)]],
      itemPrice: [0, [Validators.required, Validators.min(0)]],
      isActive: [true],
      isPrivate: [false],
      isArchived: [false]
    });
  }

  public onSave(): void {
  debugger;

    if (this.rateForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
      return;
    }
  
    const formValue = this.rateForm.value;
    // Create the payload matching the backend model
    const rateData: any = {
      resourceId: this.data.resourceId,
      validFrom: formValue.validFrom ? this.toLocalISOString(formValue.validFrom) : null,
      validTo: formValue.validTo ? this.toLocalISOString(formValue.validTo) : null,
      daily: formValue.daily || 0,
      hourly: formValue.hourly || 0,
      monthly: formValue.monthly || 0,
      percent: formValue.percent || 0,
      otRate: formValue.otRate || 0,
      itemPrice: formValue.itemPrice || 0,
      isActive: formValue.isActive !== false,
      isPrivate: formValue.isPrivate || false,
      isArchived: formValue.isArchived || false,
      createdBy: this.data.resourceRate?.createdBy || 'system',
      createdOn: this.data.resourceRate?.createdOn ? new Date(this.data.resourceRate.createdOn).toISOString() : new Date().toISOString(),
      lastEditBy: 'system',
      lastEditOn: new Date().toISOString()
    };

    // For edit mode, include the ID
    if (this.isEdit && this.data.resourceRate) {
      rateData.id = this.data.resourceRate.id;
    }

    this.loading = true;

    if (this.isEdit && this.data.resourceRate) {
      // Update existing rate
      this.apiResourceRatesService.updateResourceRate(this.data.resourceRate.id, rateData).subscribe({
        next: (result) => {
          this.snackBar.open('Resource rate updated successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating resource rate:', error);
          this.snackBar.open('Error updating resource rate', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    } else {
      // Create new rate
      this.apiResourceRatesService.addResourceRate(rateData).subscribe({
        next: (result) => {
          this.snackBar.open('Resource rate added successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('Error adding resource rate:', error);
          this.snackBar.open('Error adding resource rate', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
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
}
