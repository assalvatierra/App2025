import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiTimesheetsService } from '../../../core/services/api-timesheets.service';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timesheets-list',
  standalone: true,
  templateUrl: './timesheets-list.component.html',
  styleUrls: ['./timesheets-list.component.css'],
  imports: [
    UiPageTitleComponent,
    MatCardModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ]
})
export class TimesheetsListComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;

  public showEdit: boolean = true;
  public dataloading: boolean = true;

  // Filter properties
  public filterResourceId?: number;
  public filterStartDate?: Date;
  public filterEndDate?: Date;
  public filterStatusId?: number;

  // Lookup data
  public resources: any[] = [];
  public statuses: any[] = [];

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private apiTimesheets: ApiTimesheetsService,
    private apiResources: ApiResourcesService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.loadLookupData();
    this.retrieveApiData();
  }

  onAddRecord() {
    this.router.navigate(['timesheets/form', 0]);
    console.log('Add timesheet clicked');
  }

  onEdit(param: any) {
    this.router.navigate(['timesheets/form', param]);
    console.log('Edit timesheet clicked', param);
  }

  onArchive(param: any) {
    if (confirm('Are you sure you want to delete this timesheet?')) {
      this.apiTimesheets.deleteTimesheet(param).subscribe({
        next: () => {
          console.log('Timesheet deleted successfully');
          this.retrieveApiData();
        },
        error: (err) => {
          console.error('Error deleting timesheet:', err);
        }
      });
    }
  }

  onFilter() {
    this.retrieveApiData();
  }

  onClearFilter() {
    this.filterResourceId = undefined;
    this.filterStartDate = undefined;
    this.filterEndDate = undefined;
    this.filterStatusId = undefined;
    this.retrieveApiData();
  }

  private loadLookupData() {
    // Load resources
    this.apiResources.getActiveResources().subscribe({
      next: (res: any) => {
        this.resources = res || [];
      },
      error: (err) => {
        console.error('Error loading resources:', err);
      }
    });

    // Load statuses
    this.apiService.getItemStatusesByClassName('Timesheet').subscribe({
      next: (res: any) => {
        this.statuses = res || [];
      },
      error: (err) => {
        console.error('Error loading statuses:', err);
        // Fallback to all statuses if className filter doesn't work
        this.apiService.getItemStatuses().subscribe({
          next: (res: any) => {
            this.statuses = res || [];
          },
          error: (err) => {
            console.error('Error loading all statuses:', err);
          }
        });
      }
    });
  }

  private retrieveApiData() {
    this.dataloading = true;
    this.apiTimesheets.getTimesheets(
      this.filterResourceId,
      this.filterStartDate,
      this.filterEndDate,
      this.filterStatusId
    ).subscribe({
      next: (res: any) => {
        this.initializeTimesheetList(res);
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

  private initializeTimesheetList(param: any[]) {
    // Map resource names for display and ensure compatibility with EntityListTableItem
    const mappedData = param.map(item => ({
      id: item.id,
      name: item.resource?.name || 'N/A',
      description: item.remarks || '',
      remarks: item.remarks || '',
      code: item.resource?.code || '',
      sortOrder: item.id.toString(),
      resourceName: item.resource?.name || 'N/A',
      approverName: item.resourceId1Navigation?.name || 'N/A',
      tsDateFormatted: new Date(item.tsDate).toLocaleDateString(),
      itemStatusId: item.itemStatusId
    }));
    this.TableList.initialize(mappedData);
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'tsDateFormatted', label: 'Date' },
      { key: 'resourceName', label: 'Resource/Employee' },
      { key: 'approverName', label: 'Approver' },
      { key: 'remarks', label: 'Remarks' },
      { key: 'itemStatusId', label: 'Status' }
    ];
  }
}
