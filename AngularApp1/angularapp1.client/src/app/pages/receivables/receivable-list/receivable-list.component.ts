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
import { Receivable } from '../../../core/models/receivable.model';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-receivable-list',
  standalone: true,
  templateUrl: './receivable-list.component.html',
  styleUrls: ['./receivable-list.component.css'],
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
export class ReceivableListComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('ListTable') TableList: any;

  @Input() receivables: Receivable[] = [];
  @Input() entities: any[] = [];
  @Input() dataloading: boolean = true;

  @Output() addRecordClicked = new EventEmitter<void>();
  @Output() editRecordClicked = new EventEmitter<number>();
  @Output() deleteRecordClicked = new EventEmitter<number>();
  @Output() archiveRecordClicked = new EventEmitter<number>();
  @Output() activateRecordClicked = new EventEmitter<number>();

  public showEdit: boolean = true;

  // Filter properties
  public filterName?: string;
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
    if ((changes['receivables'] || changes['filterName'] || changes['filterEntityId'] || changes['filterIsActive']) && this.TableList) {
      this.initializeList();
    }
  }

  private loadItemTypes(): void {
    this.apiService.getItemTypesByClassName('Receivable').subscribe({
      next: (itemTypes: any[]) => {
        console.log('ItemTypes loaded for receivable list:', itemTypes);
        this.itemTypes = itemTypes;
        // Re-initialize the list after ItemTypes are loaded to update the display
        if (this.TableList && this.receivables.length > 0) {
          this.initializeList();
        }
      },
      error: (err: any) => {
        console.error('Error loading item types:', err);
      }
    });
  }

  private initializeList(): void {
    console.log('initializeList called, receivables:', this.receivables);
    const mappedData = this.receivables
      .filter(item => this.applyFilters(item))
      .map(item => ({
        id: item.id,
        trxRef: item.trxRef || '',
        trxDate: item.trxDate ? new Date(item.trxDate).toLocaleDateString() : '',
        amount: item.amount?.toFixed(2) || '0.00',
        entityId: item.entityId,
        entityName: this.getEntityName(item.entityId || 0),
        itemTypeId: item.itemTypeId,
        itemTypeName: this.getItemTypeName(item.itemTypeId || 0),
        isActive: item.isActive ? 'Yes' : 'No',
        createdOn: item.createdOn ? new Date(item.createdOn).toLocaleDateString() : ''
      }));
    
    console.log('Mapped data for table:', mappedData);
    if (this.TableList) {
      console.log('Calling TableList.initialize');
      this.TableList.initialize(mappedData);
    } else {
      console.log('TableList is not ready yet');
    }
  }

  onAddRecord(): void {
    this.addRecordClicked.emit();
  }

  onEdit(receivableId: any): void {
    this.editRecordClicked.emit(receivableId);
  }

  onDelete(receivableId: any): void {
    this.deleteRecordClicked.emit(receivableId);
  }

  onArchive(receivableId: any): void {
    this.archiveRecordClicked.emit(receivableId);
  }

  onActivate(receivableId: any): void {
    this.activateRecordClicked.emit(receivableId);
  }

  onFilter(): void {
    this.initializeList();
  }

  onClearFilter(): void {
    this.filterName = undefined;
    this.filterEntityId = undefined;
    this.filterIsActive = null;
    this.initializeList();
  }

  private applyFilters(item: Receivable): boolean {
    if (this.filterName && !item.trxRef.toLowerCase().includes(this.filterName.toLowerCase())) {
      return false;
    }
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
      { key: 'trxRef', label: 'Reference' },
      { key: 'trxDate', label: 'Transaction Date' },
      { key: 'amount', label: 'Amount' },
      { key: 'entityName', label: 'Entity' },
      { key: 'itemTypeName', label: 'Item Type' },
      { key: 'isActive', label: 'Active' },
      { key: 'createdOn', label: 'Created On' }
    ];
  }
}
