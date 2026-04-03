import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';
import { Payment } from '../../../core/models/payment.model';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    UiPageTitleComponent
  ]
})
export class PaymentFormComponent implements OnInit, OnChanges {
  @Input() payment: Payment | null = null;
  @Input() dataloading: boolean = false;

  @Output() saveRecordClicked = new EventEmitter<Payment>();
  @Output() cancelClicked = new EventEmitter<void>();

  public paymentForm!: FormGroup;
  public isNewRecord: boolean = true;
  public titleInfo: string = 'Add Payment';
  public itemTypes: any[] = [];
  public itemStatuses: any[] = [];

  private readonly itemClassName: string = 'Payment';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadItemTypes();
    this.loadItemStatuses();
    this.updateFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['payment'] && !changes['payment'].firstChange) {
      this.updateFormData();
    }
  }

  private loadItemTypes(): void {
    this.apiService.getItemTypesByClassName(this.itemClassName).subscribe({
      next: (res) => { this.itemTypes = res; },
      error: (err) => { console.error('Error loading item types:', err); }
    });
  }

  private loadItemStatuses(): void {
    this.apiService.getItemStatusesByClassName(this.itemClassName).subscribe({
      next: (res) => { this.itemStatuses = res; },
      error: (err) => { console.error('Error loading item statuses:', err); }
    });
  }

  private updateFormData(): void {
    if (this.payment && this.payment.id) {
      this.isNewRecord = false;
      this.titleInfo = 'Edit Payment';
      this.populateForm();
    } else {
      this.isNewRecord = true;
      this.titleInfo = 'Add Payment';
      this.paymentForm.reset({
        id: null,
        trxDate: this.formatDateForInput(new Date()),
        amount: 0,
        remarks: '',
        isActive: true,
        isArchived: false,
        isPrivate: false,
        entityId: null,
        itemTypeId: null,
        itemStatusId: null,
        additionalInfo: ''
      });
    }
  }

  private initForm(): void {
    this.paymentForm = this.fb.group({
      id:             [null],
      trxDate:        [this.formatDateForInput(new Date()), Validators.required],
      amount:         [0, [Validators.required, Validators.min(0)]],
      remarks:        ['', Validators.required],
      isActive:       [true],
      isArchived:     [false],
      isPrivate:      [false],
      entityId:       [null],
      itemTypeId:     [null],
      itemStatusId:   [null],
      additionalInfo: ['']
    });
  }

  private populateForm(): void {
    if (this.payment) {
      this.paymentForm.patchValue({
        id:             this.payment.id,
        trxDate:        this.payment.trxDate ? this.formatDateForInput(new Date(this.payment.trxDate)) : '',
        amount:         this.payment.amount,
        remarks:        this.payment.remarks ?? '',
        isActive:       this.payment.isActive ?? true,
        isArchived:     this.payment.isArchived ?? false,
        isPrivate:      this.payment.isPrivate ?? false,
        entityId:       this.payment.entityId ?? null,
        itemTypeId:     this.payment.itemTypeId ?? null,
        itemStatusId:   this.payment.itemStatusId ?? null,
        additionalInfo: this.payment.additionalInfo ?? ''
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
    if (this.paymentForm.valid) {
      const fv = this.paymentForm.value;
      const payment: Payment = {
        id:             fv.id,
        trxDate:        fv.trxDate,
        amount:         parseFloat(fv.amount),
        remarks:        fv.remarks ?? '',
        isActive:       fv.isActive,
        isArchived:     fv.isArchived,
        isPrivate:      fv.isPrivate,
        entityId:       fv.entityId,
        itemTypeId:     fv.itemTypeId,
        itemStatusId:   fv.itemStatusId,
        additionalInfo: fv.additionalInfo ?? ''
      };
      this.saveRecordClicked.emit(payment);
    }
  }

  onCancel(): void {
    this.cancelClicked.emit();
  }
}
