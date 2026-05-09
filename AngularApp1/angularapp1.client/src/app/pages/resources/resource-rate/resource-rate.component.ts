import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ApiResourceRatesService } from '../../../core/services/api-resource-rates.service';
import { ResourceRate } from '../../../core/models/resource-rate.model';

@Component({
  selector: 'app-resource-rate',
  standalone: true,
  templateUrl: './resource-rate.component.html',
  styleUrls: ['./resource-rate.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ResourceRateComponent implements OnInit, OnChanges {
  @Input() resourceId!: number;

  public resourceRates: ResourceRate[] = [];
  public displayedColumns: string[] = ['validFrom', 'validTo', 'daily', 'hourly', 'monthly', 'percent', 'otRate', 'isActive', 'actions'];
  public loading: boolean = false;
  public showForm: boolean = false;
  public editingRate: ResourceRate | null = null;
  public rateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiResourceRatesService: ApiResourceRatesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    if (this.resourceId) {
      this.loadResourceRates();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resourceId'] && changes['resourceId'].currentValue) {
      this.loadResourceRates();
    }
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
      isActive: [true],
      isPrivate: [false],
      isArchived: [false]
    });
  }

  private loadResourceRates(): void {
    if (!this.resourceId) return;

    this.loading = true;
    this.apiResourceRatesService.getResourceRatesByResource(this.resourceId).subscribe({
      next: (rates) => {
        this.resourceRates = rates;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading resource rates:', error);
        this.snackBar.open('Error loading resource rates', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  public onAdd(): void {
    this.editingRate = null;
    this.rateForm.reset({
      validFrom: new Date(),
      validTo: new Date(new Date().getFullYear() + 1, 11, 31),
      daily: 0,
      hourly: 0,
      monthly: 0,
      percent: 0,
      otRate: 0,
      isActive: true,
      isPrivate: false,
      isArchived: false
    });
    this.showForm = true;
  }

  public onEdit(rate: ResourceRate): void {
    this.editingRate = rate;
    this.rateForm.patchValue({
      validFrom: new Date(rate.validFrom),
      validTo: new Date(rate.validTo),
      daily: rate.daily,
      hourly: rate.hourly,
      monthly: rate.monthly,
      percent: rate.percent,
      otRate: rate.otRate,
      isActive: rate.isActive,
      isPrivate: rate.isPrivate,
      isArchived: rate.isArchived
    });
    this.showForm = true;
  }

  public onSave(): void {
    if (this.rateForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
      return;
    }

    const formValue = this.rateForm.value;
    const rateData: ResourceRate = {
      id: this.editingRate?.id || 0,
      resourceId: this.resourceId,
      createdBy: this.editingRate?.createdBy || 'system',
      createdOn: this.editingRate?.createdOn || new Date(),
      lastEditBy: 'system',
      lastEditOn: new Date(),
      ...formValue
    };

    this.loading = true;

    if (this.editingRate) {
      // Update existing rate
      this.apiResourceRatesService.updateResourceRate(this.editingRate.id, rateData).subscribe({
        next: () => {
          this.snackBar.open('Resource rate updated successfully', 'Close', { duration: 3000 });
          this.showForm = false;
          this.loadResourceRates();
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
        next: () => {
          this.snackBar.open('Resource rate added successfully', 'Close', { duration: 3000 });
          this.showForm = false;
          this.loadResourceRates();
        },
        error: (error) => {
          console.error('Error adding resource rate:', error);
          this.snackBar.open('Error adding resource rate', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  public onDelete(rate: ResourceRate): void {
    if (confirm('Are you sure you want to delete this resource rate?')) {
      this.loading = true;
      this.apiResourceRatesService.deleteResourceRate(rate.id).subscribe({
        next: () => {
          this.snackBar.open('Resource rate deleted successfully', 'Close', { duration: 3000 });
          this.loadResourceRates();
        },
        error: (error) => {
          console.error('Error deleting resource rate:', error);
          this.snackBar.open('Error deleting resource rate', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  public onCancel(): void {
    this.showForm = false;
    this.editingRate = null;
  }

  public formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  public formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
}