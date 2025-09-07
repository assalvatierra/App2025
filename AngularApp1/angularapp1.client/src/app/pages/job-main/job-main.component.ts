import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiJobMainService } from '../../core/services/api-job-main.service';
import { tableField } from '../../shared/models/entityListTableField';


@Component({
  selector: 'app-job-main',
  standalone: false,
  templateUrl: './job-main.component.html',
  styleUrls: ['./job-main.component.css']
})
export class JobMainComponent {
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    public apiService: ApiJobMainService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  onAddRecord() {
    this.router.navigate(['job-mains/form', 2]);
    console.log('Add record clicked');
  }

  onEdit(param: any) {
    this.router.navigate(['job-mains/form', param]);
    console.log('Edit record clicked', param);
  }

  onArchive(param: any) {
    console.log('Archive clicked', param);
  }

  private retrieveApiData() {
    this.dataloading = true;
    this.apiService.getJobMains()
      .subscribe({
        next: (res: any) => {
          this.initializeJobMainList(res);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          console.log('API call complete');
          this.dataloading = false;
        }
      });
  }

  private initializeJobMainList(param: any[]) {
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'jobDate', label: 'Job Date' },
      { key: 'description', label: 'Description' },
      { key: 'createdOn', label: 'Created On' },
      { key: 'createdBy', label: 'Created By' },
      { key: 'lastEditOn', label: 'Last Edit On' },
      { key: 'lastEditBy', label: 'Last Edit By' },
      { key: 'itemStatusId', label: 'Status' },
      { key: 'businessUnitId', label: 'Business Unit' }
    ];
  }
}
