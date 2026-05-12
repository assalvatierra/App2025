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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PayAddition } from '../../../../core/models/pay-addition.model';
import { ApiPayPeriodsService } from '../../../../core/services/api-pay-periods.service';
import { ApiResourcesService } from '../../../../core/services/api-resources.service';
import { Resource } from '../../../../core/models/timesheet.model';

@Component({
  selector: 'app-pay-period-additions',
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
    MatCheckboxModule,
    MatSnackBarModule
  ],
  templateUrl: './pay-period-additions.component.html',
  styleUrls: ['./pay-period-additions.component.css']
})
export class PayPeriodAdditionsComponent implements OnInit, OnChanges {
  @Input() payPeriodId: number | null = null;

  additions: PayAddition[] = [];
  resources: Resource[] = [];
  additionForm!: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showForm: boolean = false;
  loading: boolean = false;
  resourcesLoading: boolean = false;

  displayedColumns: string[] = ['resourceId', 'amount', 'remarks', 'isAdd', 'actions'];

  constructor(
    private fb: FormBuilder,
    private apiPayPeriods: ApiPayPeriodsService,
    private apiResources: ApiResourcesService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadResources();
    this.loadAdditions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['payPeriodId'] && !changes['payPeriodId'].firstChange) {
      this.loadAdditions();
    }
  }

  private initForm(): void {
    this.additionForm = this.fb.group({
      resourceId: [null],
      amount: [0, [Validators.required, Validators.min(0)]],
      remarks: [''],
      isAdd: [true]
    });
  }

  loadAdditions(): void {
    if (this.payPeriodId) {
      this.loading = true;
      this.apiPayPeriods.getPayPeriodAdditions(this.payPeriodId).subscribe({
        next: (additions: PayAddition[]) => {
          this.additions = additions;
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error loading additions:', error);
          this.showMessage('Error loading additions');
          this.loading = false;
        }
      });
    }
  }

  loadResources(): void {
    this.resourcesLoading = true;
    this.apiResources.getResources().subscribe({
      next: (resources: Resource[]) => {
        this.resources = resources;
        this.resourcesLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading resources:', error);
        this.showMessage('Error loading resources');
        this.resourcesLoading = false;
      }
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.editingId = null;
    this.additionForm.reset({
      resourceId: null,
      amount: 0,
      remarks: '',
      isAdd: true
    });
  }

  onEdit(addition: PayAddition): void {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = addition.id || null;
    this.additionForm.patchValue(addition);
  }

  onDelete(addition: PayAddition): void {
    if (confirm('Are you sure you want to delete this addition?')) {
      if (addition.id) {
        this.apiPayPeriods.deletePayAddition(addition.id).subscribe({
          next: () => {
            this.showMessage('Addition deleted successfully');
            this.loadAdditions();
          },
          error: (error: any) => {
            console.error('Error deleting addition:', error);
            this.showMessage('Error deleting addition');
          }
        });
      }
    }
  }

  onSubmit(): void {
    if (this.additionForm.valid) {
      const formValue = this.additionForm.value;

      const addition: PayAddition = {
        resourceId: formValue.resourceId,
        amount: formValue.amount,
        remarks: formValue.remarks,
        isAdd: formValue.isAdd,
        payPeriodId: this.payPeriodId || undefined
      };

      if (this.isEditing && this.editingId) {
        addition.id = this.editingId;
        this.apiPayPeriods.updatePayAddition(this.editingId, addition).subscribe({
          next: () => {
            this.showMessage('Addition updated successfully');
            this.loadAdditions();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error updating addition:', error);
            this.showMessage('Error updating addition');
          }
        });
      } else {
        this.apiPayPeriods.addPayAddition(addition).subscribe({
          next: () => {
            this.showMessage('Addition added successfully');
            this.loadAdditions();
            this.onCancel();
          },
          error: (error: any) => {
            console.error('Error adding addition:', error);
            this.showMessage('Error adding addition');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.isEditing = false;
    this.editingId = null;
    this.additionForm.reset();
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  getResourceName(resourceId: number | null | undefined): string {
    if (!resourceId) return '-';
    const resource = this.resources.find(r => r.id === resourceId);
    return resource ? `${resource.name} (${resource.code})` : resourceId.toString();
  }
}
