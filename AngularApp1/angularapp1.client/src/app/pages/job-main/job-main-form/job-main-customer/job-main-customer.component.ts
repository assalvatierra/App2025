import { Component, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiJobCustomersService, JobCustomerDto } from '../../../../core/services/api-job-customers.service';
import { JobCustomerDetailsComponent } from './job-customer-details/job-customer-details.component';
import { JobCustomerFormComponent } from './job-customer-form/job-customer-form.component';

@Component({
  selector: 'app-job-main-customer',
  standalone: false,
  templateUrl: './job-main-customer.component.html',
  styleUrl: './job-main-customer.component.css'
})
export class JobMainCustomerComponent implements AfterViewInit {

  @Input() jobMainId: number = 0;

  public jobCustomers: JobCustomerDto[] = [];
  public dataloading: boolean = false;
  public displayColumns: string[] = ['id', 'customerName', 'customerCode', 'customerContactNo1', 'customerEmail1', 'isPrimary', 'isBillTo', 'actions'];
  
  private paramId: number = 0;

  constructor(
    private api: ApiJobCustomersService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      this.dataloading = false;
      return;
    }

    if (this.paramId !== 0) {
      this.retrieveApiData(this.paramId);
    } else {
      this.dataloading = false;
      this.jobCustomers = [];
    }
  }

  /* API calls */
  private retrieveApiData(jobMainId: number): void {
    this.dataloading = true;
    this.api.getJobCustomersByJobMain(jobMainId)
      .subscribe({
        next: (res: JobCustomerDto[]) => {
          this.jobCustomers = res;
          this.dataloading = false;
        },
        error: (err) => {
          console.error('API Error:', err);
          this.dataloading = false;
          this.jobCustomers = [];
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  /* Event Handlers */
  onAddCustomer(): void {
    const dialogRef = this.dialog.open(JobCustomerFormComponent, {
      width: '600px',
      data: { jobMainId: this.paramId },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        console.log('Customer added successfully');
        this.retrieveApiData(this.paramId);
      }
    });
  }

  onEditCustomer(customerId: number): void {
    const dialogRef = this.dialog.open(JobCustomerFormComponent, {
      width: '600px',
      data: { jobMainId: this.paramId, customerId: customerId },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        console.log('Customer updated successfully');
        this.retrieveApiData(this.paramId);
      }
    });
  }

  onDeleteCustomer(customerId: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.api.deleteJobCustomer(customerId)
        .subscribe({
          next: () => {
            console.log('Customer deleted successfully');
            this.retrieveApiData(this.paramId);
          },
          error: (err) => {
            console.error('Error deleting customer:', err);
            this.dataloading = false;
          }
        });
    }
  }

  onViewDetails(customer: JobCustomerDto): void {
    const dialogRef = this.dialog.open(JobCustomerDetailsComponent, {
      width: '800px',
      data: customer,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'edit') {
        this.onEditCustomer(result.data.id);
      }
    });
  }

}
