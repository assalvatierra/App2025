import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ApiTimesheetsService } from '../../../core/services/api-timesheets.service';
import { Timesheet, ApprovalRequest } from '../../../core/models/timesheet.model';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';
import { SharedModule } from '../../../shared/shared.module';
import { EntityListTableComponent } from '../../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../../shared/models/entityListTableField';

@Component({
  selector: 'app-timesheet-approval',
  standalone: true,
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    UiPageTitleComponent,
    SharedModule
  ]
})
export class TimesheetApprovalComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;

  public dataloading: boolean = true;
  public pendingTimesheets: Timesheet[] = [];
  public showEdit: boolean = false;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private apiTimesheets: ApiTimesheetsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.retrievePendingTimesheets();
  }

  onApprove(timesheetId: number): void {
    const remarks = prompt('Enter approval remarks (optional):');
    
    const request: ApprovalRequest = {
      statusId: 3, // Approved status
      remarks: remarks || undefined
    };

    this.apiTimesheets.approveTimesheet(timesheetId, request).subscribe({
      next: () => {
        console.log('Timesheet approved successfully');
        this.retrievePendingTimesheets();
      },
      error: (err) => {
        console.error('Error approving timesheet:', err);
      }
    });
  }

  onReject(timesheetId: number): void {
    const remarks = prompt('Enter rejection reason:');
    
    if (remarks) {
      const request: ApprovalRequest = {
        statusId: 4, // Rejected status
        remarks: remarks
      };

      this.apiTimesheets.rejectTimesheet(timesheetId, request).subscribe({
        next: () => {
          console.log('Timesheet rejected successfully');
          this.retrievePendingTimesheets();
        },
        error: (err) => {
          console.error('Error rejecting timesheet:', err);
        }
      });
    }
  }

  onViewDetails(timesheetId: number): void {
    this.router.navigate(['timesheets/form', timesheetId]);
  }

  private retrievePendingTimesheets(): void {
    this.dataloading = true;
    // Use status code 'APPROVAL' to get timesheets pending approval
    // This will automatically resolve the status code to the correct ID
    this.apiTimesheets.getTimesheetsByStatusCodes(['APPROVAL']).subscribe({
      next: (res: Timesheet[]) => {
        this.pendingTimesheets = res;
        this.initializeTimesheetList(res);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.dataloading = false;
      },
      complete: () => {
        this.dataloading = false;
      }
    });
  }

  private initializeTimesheetList(param: Timesheet[]): void {
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
      actions: item.id
    }));

    this.TableList.initialize(mappedData);
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'tsDateFormatted', label: 'Date' },
      { key: 'resourceName', label: 'Employee' },
      { key: 'remarks', label: 'Remarks' },
      { key: 'actions', label: 'Actions' }
    ];
  }
}
