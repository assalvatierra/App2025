import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityListTableDataSource, EntityListTableItem } from './entity-list-table-datasource';

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

  dataSource = new EntityListTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: any[] = [];
  //displayedColumns = ['actions', 'id', 'name', 'description', 'remarks', 'code', 'sortOrder'];

  @Input()
  public get tableFields(): any {
    return this._tableFields;
  }
  public set tableFields(value: any) {
    // Format of table fields 
    // this._tableFields = [
    //  { key: 'id', label: 'Id' },
    //  { key: 'name', label: 'Name' },
    //  { key: 'description', label: 'Description' },
    //  { key: 'remarks', label: 'Remarks' },
    //  { key: 'code', label: 'Code' },
    //  { key: 'sortOrder', label: 'Sort Order' }
    //];
    this._tableFields = value;
  }

  public isLoading: boolean = true;
  private _tableFields: any[] = [];
  private _viewInitialized: boolean = false;
  private _pendingData: EntityListTableItem[] | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.initializeFields();
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this._viewInitialized = true;
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

  /* Methods */

  initialize(param: EntityListTableItem[]): void {
    console.log('=== EntityListTableComponent.initialize called ===');
    console.log('Received data count:', param.length);
    console.log('View initialized:', this._viewInitialized);

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
