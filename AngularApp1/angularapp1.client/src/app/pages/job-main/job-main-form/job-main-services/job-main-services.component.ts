import { Component, AfterViewInit, ViewChild, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityListTableComponent } from '../../../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../../../shared/models/entityListTableField';
import { ApiJobServiceService } from '../../../../core/services/api-job-service.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { JobMainServiceDialogComponent } from './job-main-service-dialog/job-main-service-dialog.component';


@Component({
  selector: 'app-job-main-services',
  standalone: false,
  templateUrl: './job-main-services.component.html',
  styleUrl: './job-main-services.component.css'
})
export class JobMainServicesComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public get tableFields() {
    return this.getTableFields();
  }

  private paramId: number = 0;


  constructor(
    public apiService: ApiJobServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Parameter ID:', this.paramId);

    this.retrieveApiData();

  }
  onAddRecord() {
    this.router.navigate(['job-service/form', 0]);
  }

  onEdit(param: any) {
    //this.router.navigate(['job-service/form', param]);
    this.openEditDialog(param);
  }

  openEditDialog(param: number): void {
    const dialogRef = this.dialog.open(JobMainServiceDialogComponent,
      {
        width: '750px', // Optional: set width
        data: { serviceId: param } // Optional: pass data to the dialog
      });


      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        // Handle the result returned from the dialog
      });
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
    this.apiService.getJobsServiceByJobId(this.paramId)
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
      { key: 'dateStart', label: 'Service Start' },
      { key: 'dateEnd', label: 'Service End' },
      { key: 'particulars', label: 'Particulars' },
      { key: 'serviceTypeId', label: 'Service Type' },
      { key: 'cost', label: 'Cost' },
      { key: 'statusId', label: 'Status' },
      { key: 'createdOn', label: 'Created On' },
      { key: 'lastEditOn', label: 'Last Edit On' }
    ];
  }


  //// Dialog functions


}
