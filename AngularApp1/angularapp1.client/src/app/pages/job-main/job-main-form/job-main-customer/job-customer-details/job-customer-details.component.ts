import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { JobCustomerDto } from '../../../../../core/services/api-job-customers.service';

@Component({
  selector: 'app-job-customer-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './job-customer-details.component.html',
  styleUrl: './job-customer-details.component.css'
})
export class JobCustomerDetailsComponent implements OnInit {

  public customer: JobCustomerDto;

  constructor(
    public dialogRef: MatDialogRef<JobCustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobCustomerDto
  ) {
    this.customer = data || {} as JobCustomerDto;
  }

  ngOnInit(): void {
    // Component initialization if needed
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    this.dialogRef.close({ action: 'edit', data: this.customer });
  }

}
