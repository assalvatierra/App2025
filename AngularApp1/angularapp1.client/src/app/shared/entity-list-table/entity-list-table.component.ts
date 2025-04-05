import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityListTableDataSource, EntityListTableItem } from './entity-list-table-datasource';
import { ItemPopupMenuComponent } from './item-popup-menu/item-popup-menu.component';

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

  @Output() editRecordClicked = new EventEmitter<any>();
  @Output() editDetailClicked = new EventEmitter<any>();
  @Output() archiveClicked = new EventEmitter<any>();

  dataSource = new EntityListTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['actions','id', 'name'];

  constructor() {

  }

  ngAfterViewInit(): void {

  }

  initialize(param: EntityListTableItem[]): void {
    this.dataSource.data = param;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

  onEditRecord(param:any) {
    this.editRecordClicked.emit(param);
  }

  onEditDetails(param: any) {
    this.editDetailClicked.emit(param);
  }

  onArchiveRecord(param: any) {
    this.archiveClicked.emit(param);
  }

  
}
