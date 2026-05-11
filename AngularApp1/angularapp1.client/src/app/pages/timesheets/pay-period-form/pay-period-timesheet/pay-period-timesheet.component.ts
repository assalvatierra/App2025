import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timesheet } from '../../../../core/models/timesheet.model';

@Component({
  selector: 'app-pay-period-timesheet',
  standalone: true,
  templateUrl: './pay-period-timesheet.component.html',
  styleUrls: ['./pay-period-timesheet.component.css'],
  imports: [CommonModule]
})
export class PayPeriodTimesheetComponent implements OnInit {
  @Input() linkedTimesheets: Timesheet[] = [];
  @Input() timesheetsLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
