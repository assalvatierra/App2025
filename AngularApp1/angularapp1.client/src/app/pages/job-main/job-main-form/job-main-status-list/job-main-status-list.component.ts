import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiJobMainStatusService } from '../../../../core/services/api-job-main-status.service';
import { ApiService } from '../../../../core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { JobMainStatusDialogComponent } from './job-main-status-dialog/job-main-status-dialog.component';

@Component({
  selector: 'app-job-main-status-list',
  standalone: false,
  templateUrl: './job-main-status-list.component.html',
  styleUrl: './job-main-status-list.component.css'
})
export class JobMainStatusListComponent implements AfterViewInit {
  public showEdit: boolean = true;
  public dataloading: boolean = false;
  public jobMainStatuses: any[] = [];
  public itemStatusLookupData: any[] = [];
  public displayColumns: string[] = ['statusDate', 'itemStatusId', 'remarks', 'createdBy'];

  private paramId: number = 0;

  constructor(
    public apiService: ApiJobMainStatusService,
    private apiServiceCommon: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Job Main ID:', this.paramId);

    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      this.dataloading = false;
      return;
    }

    // Load lookup data
    this.getApiItemStatusLookupData();

    if (this.paramId !== 0) {
      this.retrieveApiData();
    } else {
      this.dataloading = false;
      this.jobMainStatuses = [];
    }
  }

  onAddRecord() {
    this.openAddDialog();
  }

  onEdit(param: any) {
    this.openEditDialog(param);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(JobMainStatusDialogComponent,
      {
        width: '600px',
        data: {
          statusId: 0,
          jobMainId: this.paramId,
          itemStatusLookupData: this.itemStatusLookupData
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
    const dialogRef = this.dialog.open(JobMainStatusDialogComponent,
      {
        width: '600px',
        data: {
          statusId: param,
          jobMainId: this.paramId,
          itemStatusLookupData: this.itemStatusLookupData
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
    if (confirm('Are you sure you want to delete this status record?')) {
      this.apiService.deleteJobMainStatus(id).subscribe({
        next: () => {
          console.log('Status deleted successfully');
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
    this.apiService.getJobMainStatusByJobId(this.paramId)
      .subscribe({
        next: (res: any) => {
          console.log('Job main statuses retrieved:', res);
          this.jobMainStatuses = res;
          this.dataloading = false;
        },
        error: (err) => {
          console.error('API Error:', err);
          this.dataloading = false;
          this.jobMainStatuses = [];
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private getApiItemStatusLookupData(): void {
    this.dataloading = true;
    this.apiServiceCommon.getItemStatusesByClassName('JobOrder')
      .subscribe({
        next: (res: any) => {
          this.itemStatusLookupData = res || [];
        },
        error: (err) => {
          console.error('API Error (ItemStatuses):', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  getStatusName(statusId: number): string {
    const status = this.itemStatusLookupData.find(s => s.id === statusId);
    return status ? status.name : 'N/A';
  }
}
