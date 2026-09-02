import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPortalReservationsService } from '../../core/services/api-portal-reservations.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { EntityService } from '../../shared/entity.service';
import { tableField } from '../../shared/models/entityListTableField';

@Component({
  selector: 'app-portal-reservations',
  standalone: false,
  templateUrl: './portal-reservations.component.html',
  styleUrl: './portal-reservations.component.css'
})
export class PortalReservationsComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList !: EntityListTableComponent;
  public showEdit: boolean = true;
  public showAdd: boolean = false;  // Disable Add button
  public dataloading: boolean = true;

  // Status filter properties
  public selectedStatus: string = 'InProgress';  // Default value
  public statusOptions: string[] = ['ALL (No Filter)', 'New', 'Pending', 'Discarded', 'NoUnit', 'InProgress'];
  public allData: any[] = [];  // Store all data for filtering

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private api: ApiPortalReservationsService,
    private router: Router,
    private entityService: EntityService
  ) {
  }

  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  /* Event Handlers */
  onAddRecord() {
    this.router.navigate(['/portal-reservations/form', 0]);
    console.log('Add record clicked');
  }

  onEdit(param: any) {
    this.router.navigate(['/portal-reservations/form', param]);
    console.log('Edit record clicked', param);
  }

  onEditDetails(param: any) {
    console.log('Edit details clicked', param);
  }

  onArchive(param: any) {
    console.log('Archive clicked', param);
  }

  onStatusFilterChange(status: string) {
    this.selectedStatus = status;
    this.applyStatusFilter();
  }

  /* API Calls */
  private retrieveApiData() {
    this.dataloading = true;

    this.api.getList()
      .subscribe({
        next: (res: any) => {
          this.allData = res;  // Store all data
          this.applyStatusFilter();  // Apply default filter
        },

        error: (err: any) => {
          console.error('API Error:', err);
        },

        complete: () => {
          console.log('API call complete');
          this.dataloading = false;
        }
      });
  }

  /* Methods */
  private initializeEntityList(param: any[]) {
    this.TableList.initialize(param);
  }

  private applyStatusFilter() {
    if (!this.allData || this.allData.length === 0) {
      return;
    }

    // If 'ALL (No Filter)' is selected, display all data without filtering
    if (this.selectedStatus === 'ALL (No Filter)') {
      this.initializeEntityList(this.allData);
    } else {
      // Filter data by selected status
      const filteredData = this.allData.filter(item => item.status === this.selectedStatus);
      this.initializeEntityList(filteredData);
    }
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'transactionType', label: 'Transaction Type' },
      { key: 'customerName', label: 'Customer Name' },
      { key: 'contactNo', label: 'Contact' },
      { key: 'dateReceived', label: 'Date Received' },
      { key: 'status', label: 'Status' }
    ];
  }
}
