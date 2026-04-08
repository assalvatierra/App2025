import { Component, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, OnInit } from '@angular/core';
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
import { Expense } from '../../../core/models/expense.model';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
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
export class ExpenseListComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('ListTable') TableList: any;

  @Input() expenses: Expense[] = [];
  @Input() entities: any[] = [];
  @Input() dataloading: boolean = true;

  @Output() addRecordClicked = new EventEmitter<void>();
  @Output() editRecordClicked = new EventEmitter<number>();
  @Output() deleteRecordClicked = new EventEmitter<number>();
  @Output() archiveRecordClicked = new EventEmitter<number>();
  @Output() activateRecordClicked = new EventEmitter<number>();

  public showEdit: boolean = true;

  // Filter properties
  public filterEntityId?: number;
  public filterIsActive?: boolean | null = null;

  public itemTypes: any[] = [];

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadItemTypes();
  }

  ngAfterViewInit(): void {
    this.initializeList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['expenses'] || changes['filterEntityId'] || changes['filterIsActive']) && this.TableList) {
      this.initializeList();
    }
  }

  private loadItemTypes(): void {
    this.apiService.getItemTypesByClassName('Expense').subscribe({
      next: (itemTypes: any[]) => {
        console.log('ItemTypes loaded for expense list:', itemTypes);
        this.itemTypes = itemTypes;
        // Re-initialize the list after ItemTypes are loaded to update the display
        if (this.TableList && this.expenses.length > 0) {
          this.initializeList();
        }
      },
      error: (err: any) => {
        console.error('Error loading item types:', err);
      }
    });
  }

  private initializeList(): void {
    const mappedData = this.expenses
      .filter(item => this.applyFilters(item))
      .map(item => ({
        id: item.id,
        trxDate: item.trxDate ? new Date(item.trxDate).toLocaleDateString() : '',
        amount: item.amount?.toFixed(2) || '0.00',
        entityId: item.entityId,
        entityName: this.getEntityName(item.entityId || 0),
        itemTypeId: item.itemTypeId,
        itemTypeName: this.getItemTypeName(item.itemTypeId || 0),
        trxRef: item.trxRef || '',
        isActive: item.isActive ? 'Yes' : 'No',
        createdOn: item.createdOn ? new Date(item.createdOn).toLocaleDateString() : '',
        remarks: item.remarks || ''
      }));

    if (this.TableList) {
      this.TableList.initialize(mappedData);
    }
  }

  onAddRecord(): void {
    this.addRecordClicked.emit();
  }

  onEdit(expenseId: any): void {
    this.editRecordClicked.emit(expenseId);
  }

  onDelete(expenseId: any): void {
    this.deleteRecordClicked.emit(expenseId);
  }

  onArchive(expenseId: any): void {
    this.archiveRecordClicked.emit(expenseId);
  }

  onActivate(expenseId: any): void {
    this.activateRecordClicked.emit(expenseId);
  }

  onFilter(): void {
    this.initializeList();
  }

  onClearFilter(): void {
    this.filterEntityId = undefined;
    this.filterIsActive = null;
    this.initializeList();
  }

  private applyFilters(item: Expense): boolean {
    if (this.filterEntityId && item.entityId !== this.filterEntityId) {
      return false;
    }
    if (this.filterIsActive !== null && item.isActive !== this.filterIsActive) {
      return false;
    }
    return true;
  }

  private getEntityName(entityId: number): string {
    const entity = this.entities.find(e => e.id === entityId);
    return entity ? entity.name : 'Unknown';
  }

  private getItemTypeName(itemTypeId: number): string {
    if (!itemTypeId) return '';
    
    // If itemTypes haven't loaded yet, return a loading indicator
    if (this.itemTypes.length === 0) return '...';
    
    const itemType = this.itemTypes.find(it => it.id === itemTypeId);
    return itemType ? itemType.name : 'Unknown';
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'trxDate', label: 'Transaction Date' },
      { key: 'amount', label: 'Amount' },
      { key: 'entityName', label: 'Entity' },
      { key: 'itemTypeName', label: 'Item Type' },
      { key: 'trxRef', label: 'Transaction Ref' },
      { key: 'remarks', label: 'Remarks' },
      { key: 'isActive', label: 'Active' },
      { key: 'createdOn', label: 'Created On' }
    ];
  }
}
