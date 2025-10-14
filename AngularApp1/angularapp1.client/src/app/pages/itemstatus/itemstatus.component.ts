import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { EntityService } from '../../shared/entity.service';
import { tableField } from '../../shared/models/entityListTableField';

@Component({
  selector: 'app-itemstatus',
  templateUrl: './itemstatus.component.html',
  styleUrls: ['./itemstatus.component.css'],
  standalone: false
})
export class ItemStatusComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private entityService: EntityService
  ) {}

  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  onAddRecord() {
    this.router.navigate(['/references/itemstatus/form', 0]);
  }

  onEdit(param: any) {
    this.router.navigate(['/references/itemstatus/form', param]);
  }

  onEditDetails(param: any) {}
  onArchive(param: any) {}

  retrieveApiData() {
    this.dataloading = true;
    this.api.getItemStatuses().subscribe({
      next: (res: any) => {
        if (this.TableList) {
          this.TableList.initialize(res);
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      },
      complete: () => {
        this.dataloading = false;
      }
    });
  }

  getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
      { key: 'remarks', label: 'Remarks' },
      { key: 'code', label: 'Code' },
      { key: 'sortOrder', label: 'Sort Order' },
      { key: 'isActive', label: 'Active' },
      { key: 'isArchived', label: 'Archived' }
    ];
  }
}
