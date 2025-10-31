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
export class EntityListTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EntityListTableItem>;

  @Output() addRecordClicked = new EventEmitter();

  @Input() menuLabel: string = 'Actions';
  @Input() loading: boolean = false;

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
  private _tableFields: any[] = [];
  constructor() { }
  //constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngAfterViewInit(): void {
    this.initializeFields();
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
    this.dataSource.data = param;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

  initializeFields(): void {
    this.displayedColumns = [('actions')]; // Add first column 
    this._tableFields.forEach((field: any) => {
      this.displayedColumns.push(field.key);
    });

  }

}
