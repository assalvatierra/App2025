import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiChecklistService } from '../../core/services/api-checklist.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../shared/models/entityListTableField';

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrl: './checklist-item.component.css',
  standalone: false
})
export class ChecklistItemComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private api: ApiChecklistService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  onAddRecord() {
    this.router.navigate(['/references/checklist-item/form', 0]);
  }

  onEdit(param: any) {
    this.router.navigate(['/references/checklist-item/form', param]);
  }

  onEditDetails(param: any) {}

  onArchive(param: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.api.deleteItem(param).subscribe({
        next: () => {
          this.retrieveApiData();
        },
        error: (err) => {
          console.error('Delete Error:', err);
        }
      });
    }
  }

  retrieveApiData() {
    this.dataloading = true;
    this.api.getItems().subscribe({
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
      { key: 'sortOrder', label: 'Sort Order' }
    ];
  }
}
