import { Component, AfterViewInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiJobServiceService } from '../../../../core/services/api-job-service.service';
import { MatDialog } from '@angular/material/dialog';
import { JobMainServiceDialogComponent } from './job-main-service-dialog/job-main-service-dialog.component';


@Component({
  selector: 'app-job-main-services',
  standalone: false,
  templateUrl: './job-main-services.component.html',
  styleUrl: './job-main-services.component.css'
})
export class JobMainServicesComponent implements AfterViewInit {
  public showEdit: boolean = true;
  public dataloading: boolean = false;
  public jobServices: any[] = [];
  public displayColumns: string[] = ['id', 'serviceItem', 'dateStart', 'dateEnd', 'particulars', 'quotedAmt', 'supplierAmt', 'itemStatusId', 'actions'];

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

    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      this.dataloading = false;
      return;
    }

    if (this.paramId !== 0) {
      this.retrieveApiData();
    } else {
      this.dataloading = false;
      this.jobServices = [];
    }
  }
  
  onAddRecord() {
    this.openAddDialog();
  }

  onEdit(param: any) {
    this.openEditDialog(param);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(JobMainServiceDialogComponent,
      {
        width: '750px',
        data: { 
          serviceId: 0,
          jobMainId: this.paramId
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add dialog was closed', result);
      if (result) {
        this.retrieveApiData(); // Refresh the list
      }
    });
  }

  openEditDialog(param: number): void {
    const dialogRef = this.dialog.open(JobMainServiceDialogComponent,
      {
        width: '750px',
        data: { 
          serviceId: param,
          jobMainId: this.paramId
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed', result);
      if (result) {
        this.retrieveApiData(); // Refresh the list
      }
    });
  }

  onDelete(id: any) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.apiService.deleteJobService(id).subscribe({
        next: () => {
          console.log('Service deleted successfully');
          this.retrieveApiData();
        },
        error: (error) => {
          console.error('Delete error:', error);
          this.dataloading = false;
        }
      });
    }
  }

  private retrieveApiData() {
    this.dataloading = true;
    this.apiService.getJobsServiceByJobId(this.paramId)
      .subscribe({
        next: (res: any) => {
          console.log('Job services retrieved:', res);
          this.jobServices = res;
          this.dataloading = false;
        },
        error: (err) => {
          console.error('API Error:', err);
          this.dataloading = false;
          this.jobServices = [];
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

}
