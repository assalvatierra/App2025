import { Component, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class PaymentListComponent implements AfterViewInit, OnChanges {
  @ViewChild('ListTable') TableList: any;

  @Input() payments: Payment[] = [];
  @Input() dataloading: boolean = true;

  @Output() addRecordClicked = new EventEmitter<void>();
  @Output() editRecordClicked = new EventEmitter<number>();
  @Output() deleteRecordClicked = new EventEmitter<number>();

  public showEdit: boolean = true;

  // Filter properties
  public filterRemarks?: string;
  public filterIsActive?: boolean | null = null;

  public get tableFields(): tableField[] {
    return this.getTableFields();
  }

  ngAfterViewInit(): void {
    this.initializeList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['payments'] || changes['filterRemarks'] || changes['filterIsActive']) && this.TableList) {
      this.initializeList();
    }
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
    this.filterIsActive = null;
    this.initializeList();
  }

  private applyFilters(item: Payment): boolean {
    if (this.filterRemarks &&
        !item.remarks?.toLowerCase().includes(this.filterRemarks.toLowerCase())) {
      return false;
    }
    if (this.filterIsActive !== null && item.isActive !== this.filterIsActive) {
      return false;
    }
    return true;
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id',         label: 'ID' },
      { key: 'trxDate',    label: 'Transaction Date' },
      { key: 'amount',     label: 'Amount' },
      { key: 'remarks',    label: 'Remarks' },
      { key: 'entityId',   label: 'Entity ID' },
      { key: 'isActive',   label: 'Active' },
      { key: 'isArchived', label: 'Archived' },
      { key: 'createdOn',  label: 'Created On' }
    ];
  }
}
