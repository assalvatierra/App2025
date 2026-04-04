import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';
import { Payment } from '../../../core/models/payment.model';
import { ApiService } from '../../../core/api.service';
import { ApiSysFeaturesService } from '../../../core/services/api-sys-features.service';

interface PaymentMode {
  Mode: string;
  DisplayMode: string;
  includedTypes: string[];
}

interface PaymentConfig {
  Modes: PaymentMode[];
}

@Component({
  selector: 'app-payment-form',
  standalone: true,
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    UiPageTitleComponent
  ]
})
export class PaymentFormComponent implements OnInit, OnChanges {
  @Input() payment: Payment | null = null;
  @Input() defaultMode: string | null = null;
  @Input() dataloading: boolean = false;

  @Output() saveRecordClicked = new EventEmitter<Payment>();
  @Output() cancelClicked = new EventEmitter<void>();

  public paymentForm!: FormGroup;
  public isNewRecord: boolean = true;
  public titleInfo: string = 'Add Payment';
  public itemTypes: any[] = [];
  public allItemTypes: any[] = []; // Store all item types for client-side filtering
  public itemStatuses: any[] = [];

  // Payment mode configuration
  public paymentModes: PaymentMode[] = [];
  public currentMode: PaymentMode | null = null;
  public isReceiptMode: boolean = true; // Toggle state
  public modeDisplayLabel: string = 'Receipt';

  private readonly itemClassName: string = 'Payment';
  private readonly paymentConfigCode: string = 'PAYMENT_CONFIG';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private apiSysFeaturesService: ApiSysFeaturesService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadPaymentConfiguration();
    this.loadAllItemTypes();
    this.loadItemStatuses();
    this.updateFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['payment'] && !changes['payment'].firstChange) {
      this.updateFormData();
    }
    if (changes['defaultMode'] && !changes['defaultMode'].firstChange) {
      this.applyDefaultMode();
    }
  }

  private loadPaymentConfiguration(): void {
    this.apiSysFeaturesService.getSysFeatureBySysCode(this.paymentConfigCode).subscribe({
      next: (feature) => {
        if (feature && feature.isEnabled && feature.settings) {
          try {
            const config: PaymentConfig = JSON.parse(feature.settings);
            this.paymentModes = config.Modes || [];
            
            // Set initial mode (RECEIPT by default)
            // Set initial mode based on defaultMode or RECEIPT as fallback
            this.applyDefaultMode();
            
            console.log('Payment configuration loaded:', config);
          } catch (error) {
            console.error('Error parsing payment configuration:', error);
            this.applyDefaultFilter();
          }
        } else {
          console.warn('Payment configuration not found or disabled, using default');
          this.applyDefaultFilter();
        }
      },
      error: (err) => {
        console.error('Error loading payment configuration:', err);
        this.applyDefaultFilter();
      }
    });
  }

  private applyDefaultMode(): void {
    if (this.paymentModes.length === 0) return;

    // If defaultMode is provided from list filter, use it
    if (this.defaultMode) {
      const isReceipt = this.defaultMode === 'RECEIPT';
      this.isReceiptMode = isReceipt;
      this.setMode(isReceipt);
      console.log(`Applied default mode from list: ${this.defaultMode}`);
    } else {
      // Otherwise use RECEIPT as default
      this.setMode(true);
    }
  }

  private loadAllItemTypes(): void {
    this.apiService.getItemTypesByClassName(this.itemClassName).subscribe({
      next: (res) => { 
        this.allItemTypes = res;
        console.log(`Loaded ${res.length} total item types for Payment`);
        
        // Apply initial filter if modes are already loaded
        if (this.currentMode) {
          this.filterItemTypesByMode(this.currentMode);
        } else {
          this.applyDefaultFilter();
        }
      },
      error: (err) => { 
        console.error('Error loading item types:', err);
        this.allItemTypes = [];
        this.itemTypes = [];
      }
    });
  }

  private applyDefaultFilter(): void {
    // Show all item types when no mode configuration is available
    this.itemTypes = [...this.allItemTypes];
  }

  private filterItemTypesByMode(mode: PaymentMode): void {
    if (!mode.includedTypes || mode.includedTypes.length === 0) {
      this.itemTypes = [];
      console.log(`No included types for mode ${mode.Mode}`);
      return;
    }

    // Filter item types based on the included codes
    this.itemTypes = this.allItemTypes.filter(type => 
      mode.includedTypes.includes(type.code)
    );
    
    console.log(`Filtered to ${this.itemTypes.length} item types for mode ${mode.Mode}:`, mode.includedTypes);
  }

  private loadItemStatuses(): void {
    this.apiService.getItemStatusesByClassName(this.itemClassName).subscribe({
      next: (res) => { this.itemStatuses = res; },
      error: (err) => { console.error('Error loading item statuses:', err); }
    });
  }

  onModeToggle(): void {
    this.setMode(this.isReceiptMode);
  }

  private setMode(isReceipt: boolean): void {
    if (this.paymentModes.length === 0) return;

    const modeKey = isReceipt ? 'RECEIPT' : 'RELEASE';
    this.currentMode = this.paymentModes.find(m => m.Mode === modeKey) || null;
    
    if (this.currentMode) {
      this.modeDisplayLabel = this.currentMode.DisplayMode;
      this.filterItemTypesByMode(this.currentMode);
      
      // Reset itemTypeId when mode changes
      this.paymentForm.patchValue({ itemTypeId: null });
    }
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
