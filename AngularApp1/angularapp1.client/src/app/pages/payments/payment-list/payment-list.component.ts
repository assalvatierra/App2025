import { Component, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';
import { SharedModule } from '../../../shared/shared.module';
import { tableField } from '../../../shared/models/entityListTableField';
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
  selector: 'app-payment-list',
  standalone: true,
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    UiPageTitleComponent,
    SharedModule
  ]
})
export class PaymentListComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('ListTable') TableList: any;

  @Input() payments: Payment[] = [];
  @Input() dataloading: boolean = true;
  @Input() defaultFilterMode: string | null = null;

  @Output() addRecordClicked = new EventEmitter<string | null>();
  @Output() editRecordClicked = new EventEmitter<number>();
  @Output() deleteRecordClicked = new EventEmitter<number>();

  public showEdit: boolean = true;

  // Filter properties
  public filterRemarks?: string;
  public filterItemStatusId?: number | null = null;
  public filterMode?: string | null = null;

  // Status dropdown data
  public itemStatuses: any[] = [];
  public itemTypes: any[] = [];
  public paymentModes: PaymentMode[] = [];
  
  private readonly itemClassName: string = 'Payment';
  private readonly paymentConfigCode: string = 'PAYMENT_CONFIG';
  private isInitialized: boolean = false;

  constructor(
    private apiService: ApiService,
    private apiSysFeaturesService: ApiSysFeaturesService
  ) {}

  ngOnInit(): void {
    this.loadPaymentConfiguration();
    this.loadItemStatuses();
    this.loadItemTypes();
  }

  ngAfterViewInit(): void {
    this.isInitialized = true;
    // Don't call initializeList here yet - wait for data
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PaymentList ngOnChanges:', changes);
    
    if (changes['defaultFilterMode']) {
      const newMode = changes['defaultFilterMode'].currentValue;
      const prevMode = changes['defaultFilterMode'].previousValue;
      
      console.log('Mode change detected:', prevMode, '→', newMode);
      
      // Apply default filter mode whenever it changes
      if (newMode) {
        this.filterMode = newMode;
        console.log('Filter mode set to:', this.filterMode);
        
        if (this.isInitialized && this.payments && this.payments.length > 0) {
          console.log('Initializing list with', this.payments.length, 'payments');
          this.initializeList();
        } else {
          console.log('Cannot initialize list yet. isInitialized:', this.isInitialized, 
                      'payments count:', this.payments?.length || 0);
        }
      } else if (newMode === null && prevMode) {
        // Mode was cleared
        console.log('Default filter mode cleared');
        this.filterMode = null;
        if (this.isInitialized) {
          this.initializeList();
        }
      }
    }
    
    // Initialize list when payments change (including first load)
    if (changes['payments'] && this.isInitialized) {
      console.log('Payments changed, count:', this.payments?.length || 0);
      if (this.payments && this.payments.length > 0) {
        this.initializeList();
      }
    }
    
    if ((changes['filterRemarks'] || changes['filterItemStatusId']) && this.TableList && this.isInitialized) {
      this.initializeList();
    }
  }

  private applyDefaultFilterMode(): void {
    if (this.defaultFilterMode && !this.filterMode) {
      console.log('Applying default filter mode:', this.defaultFilterMode);
      this.filterMode = this.defaultFilterMode;
      if (this.isInitialized) {
        this.initializeList();
      }
    }
  }

  private loadPaymentConfiguration(): void {
    this.apiSysFeaturesService.getSysFeatureBySysCode(this.paymentConfigCode).subscribe({
      next: (feature) => {
        if (feature && feature.isEnabled && feature.settings) {
          try {
            const config: PaymentConfig = JSON.parse(feature.settings);
            this.paymentModes = config.Modes || [];
            console.log('Payment modes loaded for filtering:', this.paymentModes);
            
            // Apply default filter mode after modes are loaded
            if (this.defaultFilterMode) {
              console.log('Applying defaultFilterMode after config load:', this.defaultFilterMode);
              this.filterMode = this.defaultFilterMode;
              if (this.isInitialized && this.payments && this.payments.length > 0) {
                this.initializeList();
              }
            }
          } catch (error) {
            console.error('Error parsing payment configuration:', error);
            this.paymentModes = [];
          }
        } else {
          console.warn('Payment configuration not found or disabled');
          this.paymentModes = [];
        }
      },
      error: (err) => {
        console.error('Error loading payment configuration:', err);
        this.paymentModes = [];
      }
    });
  }

  private loadItemStatuses(): void {
    this.apiService.getItemStatusesByClassName(this.itemClassName).subscribe({
      next: (res) => { this.itemStatuses = res; },
      error: (err) => { console.error('Error loading item statuses:', err); }
    });
  }

  private loadItemTypes(): void {
    this.apiService.getItemTypesByClassName(this.itemClassName).subscribe({
      next: (res) => { this.itemTypes = res; },
      error: (err) => { console.error('Error loading item types:', err); }
    });
  }

  public get tableFields(): tableField[] {
    return this.getTableFields();
  }

  private initializeList(): void {
    const mappedData = this.payments
      .filter(item => this.applyFilters(item))
      .map(item => ({
        id:         item.id,
        trxDate:    item.trxDate ? new Date(item.trxDate).toLocaleDateString() : '',
        amount:     item.amount?.toFixed(2) ?? '0.00',
        remarks:    item.remarks ?? '',
        entityId:   item.entityId ?? '',
        itemType:   this.getItemTypeName(item.itemTypeId),
        isActive:   item.isActive ? 'Yes' : 'No',
        isArchived: item.isArchived ? 'Yes' : 'No',
        createdOn:  item.createdOn ? new Date(item.createdOn).toLocaleDateString() : ''
      }));

    if (this.TableList) {
      this.TableList.initialize(mappedData);
    }
  }

  onAddRecord(): void {
    this.addRecordClicked.emit();
    this.addRecordClicked.emit(this.filterMode || null);
  }

  onEdit(id: any): void {
    this.editRecordClicked.emit(id);
  }

  onDelete(id: any): void {
    this.deleteRecordClicked.emit(id);
  }

  onFilter(): void {
    this.initializeList();
  }

  onClearFilter(): void {
    this.filterRemarks = undefined;
    this.filterItemStatusId = null;
    this.filterMode = null;
    this.initializeList();
  }

  private applyFilters(item: Payment): boolean {
    // Filter by remarks
    if (this.filterRemarks &&
        !item.remarks?.toLowerCase().includes(this.filterRemarks.toLowerCase())) {
      return false;
    }
    
    // Filter by item status
    if (this.filterItemStatusId !== null && this.filterItemStatusId !== undefined &&
        item.itemStatusId !== this.filterItemStatusId) {
      return false;
    }
    
    // Filter by mode
    if (this.filterMode) {
      const selectedMode = this.paymentModes.find(m => m.Mode === this.filterMode);
      if (selectedMode) {
        // Get the item type code for this payment
        const itemType = this.itemTypes.find(t => t.id === item.itemTypeId);
        if (!itemType || !selectedMode.includedTypes.includes(itemType.code)) {
          return false;
        }
      }
    }
    
    return true;
  }

  private getItemTypeName(itemTypeId?: number): string {
    if (!itemTypeId) return '';
    const itemType = this.itemTypes.find(t => t.id === itemTypeId);
    return itemType ? itemType.name : '';
  }

  public getSelectedModeHint(): string {
    if (!this.filterMode) return '';
    const mode = this.paymentModes.find(m => m.Mode === this.filterMode);
    return mode ? mode.includedTypes.join(', ') : '';
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id',         label: 'ID' },
      { key: 'trxDate',    label: 'Transaction Date' },
      { key: 'amount',     label: 'Amount' },
      { key: 'remarks',    label: 'Remarks' },
      { key: 'itemType',   label: 'Type' },
      { key: 'entityId',   label: 'Entity ID' },
      { key: 'isActive',   label: 'Active' },
      { key: 'isArchived', label: 'Archived' },
      { key: 'createdOn',  label: 'Created On' }
    ];
  }
}
