import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiJobServiceService } from '../../core/services/api-job-service.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../shared/models/entityListTableField';

@Component({
  selector: 'app-job-service',
  standalone: false,
  templateUrl: './job-service.component.html',
  styleUrls: ['./job-service.component.css']
})
export class JobServiceComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;

  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    public apiService: ApiJobServiceService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  onAddRecord() {
    this.router.navigate(['job-service/form', 0]);
  }

  onEdit(param: any) {
    this.router.navigate(['job-service/form', param]);
  }

  onDelete(id: any) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.apiService.deleteJobService(id).subscribe({
        next: () => {
          this.retrieveApiData();
        },
        error: (error) => {
          console.error('Delete error:', error);
        }
      });
    }
  }

  private retrieveApiData() {
    this.dataloading = true;
    this.apiService.getJobServices()
      .subscribe({
        next: (res: any) => {
          this.initializeJobServiceList(res);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private initializeJobServiceList(param: any[]) {
    this.TableList.initialize(param);
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'jobId', label: 'Job ID' },
      { key: 'serviceDate', label: 'Service Date' },
      { key: 'description', label: 'Description' },
      { key: 'serviceTypeId', label: 'Service Type' },
      { key: 'cost', label: 'Cost' },
      { key: 'statusId', label: 'Status' },
      { key: 'createdOn', label: 'Created On' },
      { key: 'lastEditOn', label: 'Last Edit On' }
    ];
  }
}
