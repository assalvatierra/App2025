import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiPayPeriodsService } from '../../../core/services/api-pay-periods.service';
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
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pay-period',
  standalone: true,
  templateUrl: './pay-period.component.html',
  styleUrls: ['./pay-period.component.css'],
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
export class PayPeriodComponent implements AfterViewInit, OnInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;

  public showEdit: boolean = true;
  public dataloading: boolean = true;

  // Filter properties
  public filterIsActive?: boolean;
  public filterDateFrom?: Date;
  public filterDateTo?: Date;
  public filterItemStatusId?: number;

  // Lookup data
  public statuses: any[] = [];
  private lastPayPeriodData: any[] = [];

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private apiPayPeriods: ApiPayPeriodsService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to navigation events to refresh data when returning from form
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url === '/timesheets/pay-periods') {
        this.retrieveApiData();
      }
    });
  }

  ngAfterViewInit(): void {
    this.loadLookupData();
    this.retrieveApiData();
  }

  onAddRecord() {
    this.router.navigate(['timesheets/pay-periods/form', 0]);
    console.log('Add pay period clicked');
  }

  onEdit(param: any) {
    this.router.navigate(['timesheets/pay-periods/form', param]);
    console.log('Edit pay period clicked', param);
  }

  onArchive(param: any) {
    if (confirm('Are you sure you want to delete this pay period?')) {
      this.apiPayPeriods.deletePayPeriod(param).subscribe({
        next: () => {
          console.log('Pay period deleted successfully');
          this.retrieveApiData();
        },
        error: (err) => {
          console.error('Error deleting pay period:', err);
        }
      });
    }
  }

  onFilter() {
    this.retrieveApiData();
  }

  onClearFilter() {
    this.filterIsActive = undefined;
    this.filterDateFrom = undefined;
    this.filterDateTo = undefined;
    this.filterItemStatusId = undefined;
    this.retrieveApiData();
  }

  private loadLookupData() {
    // Load statuses
    this.apiService.getItemStatusesByClassName('PayPeriod').subscribe({
      next: (res: any) => {
        this.statuses = res || [];
        if (this.lastPayPeriodData.length > 0) {
          this.initializePayPeriodList(this.lastPayPeriodData);
        }
      },
      error: (err) => {
        console.error('Error loading statuses:', err);
        // Fallback to all statuses if className filter doesn't work
        this.apiService.getItemStatuses().subscribe({
          next: (res: any) => {
            this.statuses = res || [];
            if (this.lastPayPeriodData.length > 0) {
              this.initializePayPeriodList(this.lastPayPeriodData);
            }
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
    this.apiPayPeriods.getPayPeriods(
      this.filterIsActive,
      this.filterDateFrom,
      this.filterDateTo,
      this.filterItemStatusId
    ).subscribe({
      next: (res: any) => {
        this.lastPayPeriodData = res || [];
        this.initializePayPeriodList(this.lastPayPeriodData);
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

  private initializePayPeriodList(param: any[]) {
    const mappedData = param.map(item => ({
      id: item.id,
      name: `${new Date(item.dateFrom).toLocaleDateString()} - ${new Date(item.dateTo).toLocaleDateString()}`,
      description: item.notes || '',
      remarks: item.notes || '',
      code: item.id.toString(),
      sortOrder: item.id.toString(),
      dateFromFormatted: new Date(item.dateFrom).toLocaleDateString(),
      dateToFormatted: new Date(item.dateTo).toLocaleDateString(),
      payDateFormatted: new Date(item.payDate).toLocaleDateString(),
      itemStatusId: item.itemStatusId,
      statusName: this.statuses.find(s => s.id === item.itemStatusId)?.name || '',
      isActive: item.isActive,
      isActiveText: item.isActive ? 'Yes' : 'No',
      notes: item.notes || ''
    }));
    this.TableList.initialize(mappedData);
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'dateFromFormatted', label: 'Date From' },
      { key: 'dateToFormatted', label: 'Date To' },
      { key: 'payDateFormatted', label: 'Pay Date' },
      { key: 'isActiveText', label: 'Active' },
      { key: 'statusName', label: 'Status' },
      { key: 'notes', label: 'Notes' }
    ];
  }
}
