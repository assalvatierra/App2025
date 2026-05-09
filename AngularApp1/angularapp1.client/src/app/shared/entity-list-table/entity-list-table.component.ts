import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EntityListTableDataSource, EntityListTableItem } from './entity-list-table-datasource';
import { AdvancedFilterDialogComponent, AdvancedFilterField } from './advanced-filter-dialog/advanced-filter-dialog.component';

@Component({
  selector: 'app-entity-list-table',
  templateUrl: './entity-list-table.component.html',
  styleUrl: './entity-list-table.component.css',
  standalone: false
})
export class EntityListTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EntityListTableItem>;

  @Output() addRecordClicked = new EventEmitter();

  @Input() menuLabel: string = 'Actions';

  @Input() showAdd: boolean = true;
  @Input() addTitle: string = 'Add Record';
  @Input() showEdit: boolean = true;
  @Input() editTitle: string = 'Edit Record';
  @Output() editRecordClicked = new EventEmitter<any>();
  @Output() editDetailClicked = new EventEmitter<any>();
  @Output() archiveClicked = new EventEmitter<any>();

  @Input() showEditDetails: boolean = true;
  @Input() showFilter: boolean = true;
  @Input() showAdvancedFilter: boolean = false;
  @Input() advancedFilterFields: AdvancedFilterField[] = [];

  // New sorting inputs
  @Input() sortColumn: string = '';
  @Input() sortType: 'Ascending' | 'Descending' | '' = 'Ascending';

  dataSource = new EntityListTableDataSource();
  filterValue: string = '';
  filterPopupVisible: boolean = false;
  advancedFilters: { [key: string]: any } = {};
  private allData: EntityListTableItem[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: any[] = [];

  @Input()
  public get tableFields(): any {
    return this._tableFields;
  }
  public set tableFields(value: any) {
    this._tableFields = value;
  }

  public isLoading: boolean = true;
  private _tableFields: any[] = [];
  private _viewInitialized: boolean = false;
  private _pendingData: EntityListTableItem[] | null = null;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.initializeFields();
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this._viewInitialized = true;
    
    // Apply initial sorting if provided
    if (this.sortColumn && this.sortType && this.sort) {
      const direction = this.sortType === 'Ascending' ? 'asc' : 'desc';
      this.sort.active = this.sortColumn;
      this.sort.direction = direction as 'asc' | 'desc';
      
      // Trigger the sort change
      this.sort.sortChange.emit({
        active: this.sortColumn,
        direction: direction as 'asc' | 'desc'
      } as Sort);
    }
    
    // Apply any data that arrived before the view was ready
    if (this._pendingData !== null) {
      this._applyData(this._pendingData);
      this._pendingData = null;
    }
  }


  onAddRecord() {
    this.addRecordClicked.emit();
  }
  onEditRecord(param:any) {
    this.editRecordClicked.emit(param);
  }

  onEditDetails(param: any) {
    this.editDetailClicked.emit(param);
    console.log('Edit details clicked', param);
  }

  onArchiveRecord(param: any) {
    this.archiveClicked.emit(param);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.filterValue = '';
    this.dataSource.filter = '';
  }

  toggleBasicFilterPopup() {
    this.filterPopupVisible = !this.filterPopupVisible;
  }

  closeBasicFilterPopup() {
    this.filterPopupVisible = false;
  }

  openAdvancedFilterDialog() {
    const dialogRef = this.dialog.open(AdvancedFilterDialogComponent, {
      width: '700px',
      maxWidth: '90vw',
      data: {
        filterFields: this.advancedFilterFields,
        currentFilters: this.advancedFilters
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.advancedFilters = result;
        this.applyAdvancedFilters();
      }
    });
  }

  private applyAdvancedFilters() {
    console.log('=== Applying Advanced Filters ===');
    console.log('All data count:', this.allData.length);
    console.log('Active filters:', this.advancedFilters);

    if (!this.allData || this.allData.length === 0) {
      console.warn('No data available to filter');
      return;
    }

    let filtered = [...this.allData];
    const filterKeys = Object.keys(this.advancedFilters);
    const hasActiveFilters = filterKeys.some(key => {
      const value = this.advancedFilters[key];
      return value !== null && value !== undefined && value !== '';
    });

    if (hasActiveFilters) {
      // Apply advanced filters
      Object.keys(this.advancedFilters).forEach(key => {
        const filterValue = this.advancedFilters[key];
        if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
          console.log(`Filtering by ${key}: ${filterValue}`);
          filtered = filtered.filter(item => {
            const itemValue = (item as any)[key];
            if (itemValue === null || itemValue === undefined) {
              return false;
            }
            const match = itemValue.toString().toLowerCase().includes(filterValue.toLowerCase());
            return match;
          });
        }
      });
      console.log('Filtered data count:', filtered.length);
    } else {
      console.log('No active filters, showing all data');
    }

    // Update the datasource with filtered data
    this.dataSource.data = filtered;
    
    // Reset paginator
    if (this.paginator) {
      this.paginator.firstPage();
    }
    
    // Trigger refresh
    this.dataSource.refresh();
    
    console.log('=== Advanced Filters Applied ===');
  }

  getAdvancedFilterCount(): number {
    return Object.keys(this.advancedFilters).filter(key => {
      const value = this.advancedFilters[key];
      return value !== null && value !== undefined && value !== '';
    }).length;
  }

  clearAdvancedFilters() {
    console.log('=== Clearing Advanced Filters ===');
    this.advancedFilters = {};
    // Reset to show all data
    this.dataSource.data = [...this.allData];
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.dataSource.refresh();
    console.log('Advanced filters cleared, showing all data:', this.allData.length);
  }

  /* Methods */

  initialize(param: EntityListTableItem[]): void {
    console.log('=== EntityListTableComponent.initialize called ===');
    console.log('Received data count:', param.length);
    console.log('View initialized:', this._viewInitialized);

    // Store all data for advanced filtering
    this.allData = [...param];

    if (this._viewInitialized) {
      this._applyData(param);
    } else {
      // View not ready yet — store data and apply in ngAfterViewInit
      console.log('View not ready, queuing data for later...');
      this._pendingData = param;
    }
  }

  private _applyData(param: EntityListTableItem[]): void {
    console.log('=== EntityListTableComponent._applyData called ===');
    console.log('Data count:', param.length);
    console.log('Paginator available:', !!this.paginator);
    console.log('Sort available:', !!this.sort);
    console.log('Table available:', !!this.table);

    this.dataSource.data = param;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    console.log('DataSource.data set to:', this.dataSource.data.length, 'items');

    // Reset paginator to first page
    if (this.paginator && this.paginator.pageIndex !== 0) {
      console.log('Resetting paginator to first page');
      this.paginator.firstPage();
    } else {
      console.log('Already on first page or no paginator, triggering manual refresh');
      this.dataSource.refresh();
    }

    console.log('=== EntityListTableComponent._applyData END ===');
  }

  initializeFields(): void {
    this.displayedColumns = [('actions')]; // Add first column 
    this._tableFields.forEach((field: any) => {
      this.displayedColumns.push(field.key);
    });

  }

}
