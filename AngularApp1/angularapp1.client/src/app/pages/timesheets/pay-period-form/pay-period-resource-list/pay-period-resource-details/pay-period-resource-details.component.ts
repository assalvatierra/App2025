import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Timesheet } from '../../../../../core/models/timesheet.model';
import { PayAddition } from '../../../../../core/models/pay-addition.model';

@Component({
  selector: 'app-pay-period-resource-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatTableModule, MatCardModule],
  templateUrl: './pay-period-resource-details.component.html',
  styleUrls: ['./pay-period-resource-details.component.css']
})
export class PayPeriodResourceDetailsComponent implements OnInit {
  resourceName: string = '';
  resourceType: string = '';
  timesheets: Timesheet[] = [];
  additions: PayAddition[] = [];
  summary: any = null;

  constructor(
    private dialogRef: MatDialogRef<PayPeriodResourceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.resourceName = data.resourceName || '';
      this.resourceType = data.resourceType || '';
      this.timesheets = data.timesheets || [];
      this.additions = data.additions || [];
      this.summary = data.summary || null;
    }
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
