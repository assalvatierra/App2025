import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResourcesService } from '../../../core/services/api-resources.service';
import { ApiService } from '../../../core/api.service';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../../shared/shared.module';
import { EntityListTableComponent } from '../../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../../shared/models/entityListTableField';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resources-list',
  standalone: true,
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css'],
  imports: [
    UiPageTitleComponent,
    MatCardModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ]
})
export class ResourcesListComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;

  public showEdit: boolean = true;
  public dataloading: boolean = true;

  // Filter properties
  public filterCode?: string;
  public filterName?: string;
  public filterItemTypeId?: number;

  // Lookup data
  public itemTypes: any[] = [];

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private apiResources: ApiResourcesService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.loadLookupData();
    this.retrieveApiData();
  }

  onAddRecord() {
    this.router.navigate(['resources/form', 0]);
    console.log('Add resource clicked');
  }

  onEdit(param: any) {
    this.router.navigate(['resources/form', param]);
    console.log('Edit resource clicked', param);
  }

  onArchive(param: any) {
    if (confirm('Are you sure you want to delete this resource?')) {
      this.apiResources.deleteResource(param).subscribe({
        next: () => {
          console.log('Resource deleted successfully');
          this.retrieveApiData();
        },
        error: (err) => {
          console.error('Error deleting resource:', err);
        }
      });
    }
  }

  onFilter() {
    this.retrieveApiData();
  }

  onClearFilter() {
    this.filterCode = undefined;
    this.filterName = undefined;
    this.filterItemTypeId = undefined;
    this.retrieveApiData();
  }

  private loadLookupData() {
    // Load item types
    this.apiService.getItemTypesByClassName('Resource').subscribe({
      next: (res: any) => {
        this.itemTypes = res || [];
      },
      error: (err) => {
        console.error('Error loading item types:', err);
        // Fallback to all item types if className filter doesn't work
        this.apiService.getItemTypes().subscribe({
          next: (res: any) => {
            this.itemTypes = res || [];
          },
          error: (err) => {
            console.error('Error loading all item types:', err);
          }
        });
      }
    });
  }

  private retrieveApiData() {
    this.dataloading = true;
    this.apiResources.getResources(
      this.filterCode,
      this.filterName,
      this.filterItemTypeId
    ).subscribe({
      next: (res: any) => {
        this.initializeResourceList(res);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.dataloading = false;
      },
      complete: () => {
        console.log('API call complete');
        this.dataloading = false;
      }
    });
  }

  private initializeResourceList(param: any[]) {
    // Map data to ensure compatibility with EntityListTableItem
    const mappedData = param.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      remarks: item.remarks || '',
      code: item.code || '',
      sortOrder: item.sortOrder?.toString() || '',
      itemTypeId: item.itemTypeId,
      itemStatusId: item.itemStatusId
    }));
    this.TableList.initialize(mappedData);
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
      { key: 'itemTypeId', label: 'Type' },
      { key: 'itemStatusId', label: 'Status' },
      { key: 'sortOrder', label: 'Sort Order' }
    ];
  }
}
