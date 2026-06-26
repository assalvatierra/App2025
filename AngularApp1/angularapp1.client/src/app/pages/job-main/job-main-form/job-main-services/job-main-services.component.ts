import { Component, AfterViewInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiJobServiceService } from '../../../../core/services/api-job-service.service';
import { ApiJobServiceRequirementService } from '../../../../core/services/api-job-service-requirement.service';
import { ApiJobServiceResourceService } from '../../../../core/services/api-job-service-resource.service';
import { MatDialog } from '@angular/material/dialog';
import { JobMainServiceDialogComponent } from './job-main-service-dialog/job-main-service-dialog.component';
import { JobServiceRequirementsDialogComponent } from './job-service-requirements-dialog/job-service-requirements-dialog.component';
import { JobServiceResourcesDialogComponent } from './job-service-resources-dialog/job-service-resources-dialog.component';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


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
  public requirementCounts: Map<number, number> = new Map();
  public resourceCounts: Map<number, number> = new Map();
  public displayColumns: string[] = ['id', 'serviceItem', 'dateStart', 'dateEnd', 'particulars', 'quotedAmt', 'supplierAmt', 'itemStatusId', 'requirements', 'resources', 'actions'];

  private paramId: number = 0;


  constructor(
    public apiService: ApiJobServiceService,
    private apiRequirementService: ApiJobServiceRequirementService,
    private apiResourceService: ApiJobServiceResourceService,
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

  onManageRequirements(service: any): void {
    const dialogRef = this.dialog.open(JobServiceRequirementsDialogComponent, {
      width: '800px',
      data: {
        jobServiceId: service.id,
        serviceName: service.serviceItem?.description || `Service #${service.id}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Requirements dialog closed');
      // Reload requirement counts after dialog closes
      this.loadRequirementCounts();
    });
  }

  onManageResources(service: any): void {
    const dialogRef = this.dialog.open(JobServiceResourcesDialogComponent, {
      width: '800px',
      data: {
        jobServiceId: service.id,
        serviceName: service.serviceItem?.description || `Service #${service.id}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resources dialog closed');
      // Reload resource counts after dialog closes
      this.loadResourceCounts();
    });
  }

  hasRequirements(serviceId: number): boolean {
    const count = this.requirementCounts.get(serviceId);
    return count !== undefined && count > 0;
  }

  getRequirementCount(serviceId: number): number {
    return this.requirementCounts.get(serviceId) || 0;
  }

  hasResources(serviceId: number): boolean {
    const count = this.resourceCounts.get(serviceId);
    return count !== undefined && count > 0;
  }

  getResourceCount(serviceId: number): number {
    return this.resourceCounts.get(serviceId) || 0;
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
          // Set loading to false before loading counts so table appears immediately
          this.dataloading = false;
          this.loadRequirementCounts();
          this.loadResourceCounts();
        },
        error: (err) => {
          console.error('API Error:', err);
          this.dataloading = false;
          this.jobServices = [];
        }
      });
  }

  private loadRequirementCounts(): void {
    if (this.jobServices.length === 0) {
      console.log('No services to load requirements for');
      return;
    }

    console.log('Loading requirement counts for', this.jobServices.length, 'services');

    // Create an array of observables to get requirements for each service
    // Use catchError to handle individual failures without breaking the entire batch
    const requirementRequests = this.jobServices.map(service =>
      this.apiRequirementService.getRequirementsByJobService(service.id).pipe(
        catchError(err => {
          console.error(`Error loading requirements for service ${service.id}:`, err);
          // Return empty array on error so forkJoin continues
          return of([]);
        })
      )
    );

    // Execute all requests in parallel
    forkJoin(requirementRequests).subscribe({
      next: (results: any[]) => {
        // Clear existing counts
        this.requirementCounts.clear();
        
        // Store the count for each service
        results.forEach((requirements, index) => {
          const serviceId = this.jobServices[index].id;
          const count = requirements.length;
          this.requirementCounts.set(serviceId, count);
          console.log(`Service ${serviceId} has ${count} requirements`);
        });
        
        console.log('Requirement counts loaded successfully:', Array.from(this.requirementCounts.entries()));
      },
      error: (err) => {
        console.error('Error in forkJoin (this should not happen with catchError):', err);
      }
    });
  }

  private loadResourceCounts(): void {
    if (this.jobServices.length === 0) {
      console.log('No services to load resources for');
      return;
    }

    console.log('Loading resource counts for', this.jobServices.length, 'services');

    // Create an array of observables to get resources for each service
    // Use catchError to handle individual failures without breaking the entire batch
    const resourceRequests = this.jobServices.map(service =>
      this.apiResourceService.getByJobService(service.id).pipe(
        catchError(err => {
          console.error(`Error loading resources for service ${service.id}:`, err);
          // Return empty array on error so forkJoin continues
          return of([]);
        })
      )
    );

    // Execute all requests in parallel
    forkJoin(resourceRequests).subscribe({
      next: (results: any[]) => {
        // Clear existing counts
        this.resourceCounts.clear();
        
        // Store the count for each service
        results.forEach((resources, index) => {
          const serviceId = this.jobServices[index].id;
          const count = resources.length;
          this.resourceCounts.set(serviceId, count);
          console.log(`Service ${serviceId} has ${count} resources`);
        });
        
        console.log('Resource counts loaded successfully:', Array.from(this.resourceCounts.entries()));
      },
      error: (err) => {
        console.error('Error in forkJoin (this should not happen with catchError):', err);
      }
    });
  }

}
