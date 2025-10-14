import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityListTableDataSource, EntityListTableItem } from '../entity-list-table/entity-list-table-datasource';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-list-dialog',
  standalone: false,
  templateUrl: './list-dialog.component.html',
  styleUrl: './list-dialog.component.css'
})
export class ListDialogComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EntityListTableItem>;

  @Output() addRecordClicked = new EventEmitter();

  dataSource = new EntityListTableDataSource();

  DialogTitle: string = 'Browse Item';
  DialogMessage: string = 'Please select an item from the list';
  selectedItems: any[] = [];
  showCheckbox: boolean = true; 
  MultipleSelection: boolean = false;

  displayedColumns: any[] = [];
  public get tableFields(): any {
    return this._tableFields;
  }
  public set tableFields(value: any) {
    this._tableFields = value;
  }
  private _tableFields: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ListDialogComponent>,
    private cdr: ChangeDetectorRef
  ) { }



  ngAfterViewInit(): void {
    if (this.data && this.data.tableFields) {
      this.initializeDialogSettings();
      this.initializeFields();
      this.initializeData(this.data.entityData);

      this.cdr.detectChanges();
    }
  }

  /* Event Handlers */
  onSelectedItem(row: any, $event: any): void {
    const checkbox = $event.target as HTMLInputElement; // Cast the event target to an HTMLInputElement
    const isChecked = checkbox.checked; // Get the checked state of the checkbox
    //const value = checkbox.value; // Get the value of the checkbox (row.id)

    if (!this.showCheckbox) {
      this.selectedItems[0] = row;
      this.dialogRef.close(this.selectedItems);
    }

    if (this.showCheckbox && !this.MultipleSelection) {
      this.selectedItems[0] = row;
    }

    if (this.showCheckbox && this.MultipleSelection) {
      if (isChecked) {
        this.selectedItems.push(row);
      } else {
        this.selectedItems = this.selectedItems.filter(item => item.id !== row.id);
      }
    }


  }

  

  /* Methods */
  initializeDialogSettings(): void {
    this.tableFields = this.data.tableFields;

    if(this.data.DialogTitle) this.DialogTitle = this.data.DialogTitle;
    if(this.data.DialogMessage) this.DialogMessage = this.data.DialogMessage;
    if(this.data.showCheckbox != null) this.showCheckbox = this.data.showCheckbox;
    if (this.data.MultipleSelection != null) this.MultipleSelection = this.data.MultipleSelection;
  }

  initializeData(param: EntityListTableItem[]): void {
    this.dataSource.data = param;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

  initializeFields(): void {
    this.displayedColumns = [('actions')]; // Add first column 
    this.tableFields.forEach((field: any) => {
      this.displayedColumns.push(field.key);
    });

  }

  isSelected(row: any): boolean {
    return this.selectedItems.some(item => item.id === row.id);
  }



}
