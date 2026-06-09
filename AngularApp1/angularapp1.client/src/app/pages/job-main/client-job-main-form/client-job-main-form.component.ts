import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiJobOrderService } from '../../../core/services/client/api-job-order.service';
import { ApiJobCustomersService, JobCustomerDto } from '../../../core/services/api-job-customers.service';
import { ApiJobServiceService, JobService } from '../../../core/services/api-job-service.service';
import { ApiJobScheduleService, JobSchedule } from '../../../core/services/api-job-schedule.service';

@Component({
  selector: 'app-client-job-main-form',
  standalone: false,
  templateUrl: './client-job-main-form.component.html',
  styleUrl: './client-job-main-form.component.css'
})
export class ClientJobMainFormComponent implements OnInit, OnChanges {

  @Input() recordGuid: string = '';

  public jobOrder: any = null;
  public dataloading: boolean = false;
  public sectionsLoading: boolean = false;
  public errorMessage: string = '';

  public customers: JobCustomerDto[] = [];
  public services: JobService[] = [];
  public schedules: JobSchedule[] = [];

  constructor(
    private apiJobOrderService: ApiJobOrderService,
    private apiJobCustomersService: ApiJobCustomersService,
    private apiJobServiceService: ApiJobServiceService,
    private apiJobScheduleService: ApiJobScheduleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeGuid = this.route.snapshot.paramMap.get('recordId');
    if (routeGuid) {
      this.recordGuid = routeGuid;
      this.loadJobOrder();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recordGuid'] && this.recordGuid) {
      this.loadJobOrder();
    }
  }

  getServiceParticulars(jobServiceId?: number): string {
    const service = this.services.find(s => s.id === jobServiceId);
    return service ? service.particulars : '';
  }

  private loadJobOrder(): void {
    this.dataloading = true;
    this.errorMessage = '';
    this.jobOrder = null;

    this.apiJobOrderService.getJobMainByRecordGuid(this.recordGuid).subscribe({
      next: (data) => {
        this.jobOrder = data;
        this.dataloading = false;
        this.loadRelatedData(data.id);
      },
      error: (err) => {
        console.error('Failed to load job order:', err);
        this.errorMessage = 'Failed to load job order. Please try again.';
        this.dataloading = false;
      }
    });
  }

  private loadRelatedData(jobMainId: number): void {
    this.sectionsLoading = true;
    forkJoin({
      customers: this.apiJobCustomersService.getJobCustomersByJobMain(jobMainId),
      services: this.apiJobServiceService.getJobsServiceByJobId(jobMainId),
      schedules: this.apiJobScheduleService.getByJobId(jobMainId)
    }).subscribe({
      next: ({ customers, services, schedules }) => {
        this.customers = customers;
        this.services = services;
        this.schedules = schedules;
        this.sectionsLoading = false;
      },
      error: (err) => {
        console.error('Failed to load related data:', err);
        this.sectionsLoading = false;
      }
    });
  }
}
