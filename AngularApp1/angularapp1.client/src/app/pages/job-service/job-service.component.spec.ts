import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { JobServiceComponent } from './job-service.component';
import { ApiJobServiceService, JobService } from '../../core/services/api-job-service.service';

@Component({
  selector: 'app-entity-list-table',
  standalone: true,
  template: ''
})
class EntityListTableStubComponent {
  @Input() tableFields: any[] = [];
  @Input() showEdit = true;
  @Output() editRecordClicked = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  initializeCalls: any[][] = [];

  initialize(data: any[]) {
    this.initializeCalls.push(data);
  }
}

describe('JobServiceComponent', () => {
  let component: JobServiceComponent;
  let fixture: ComponentFixture<JobServiceComponent>;
  let router: Router;
  let apiService: jasmine.SpyObj<ApiJobServiceService>;

  const services: JobService[] = [
    {
      id: 1,
      jobMainId: 11,
      particulars: 'a',
      dateStart: new Date(),
      dateEnd: new Date(),
      quotedAmt: 0,
      supplierAmt: 0,
      createdBy: 'a',
      createdOn: new Date(),
      lastEditBy: 'a',
      lastEditOn: new Date(),
      isArchived: false,
      isPrivate: false,
      isActive: true,
      serviceItemId: 1,
      serviceItem: null,
      supplierId: 1,
      itemStatusId: 1,
      sortOrder: 1
    },
    {
      id: 2,
      jobMainId: 12,
      particulars: 'b',
      dateStart: new Date(),
      dateEnd: new Date(),
      quotedAmt: 0,
      supplierAmt: 0,
      createdBy: 'b',
      createdOn: new Date(),
      lastEditBy: 'b',
      lastEditOn: new Date(),
      isArchived: false,
      isPrivate: false,
      isActive: true,
      serviceItemId: 2,
      serviceItem: null,
      supplierId: 2,
      itemStatusId: 1,
      sortOrder: 1
    }
  ];

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiJobServiceService', ['getJobServices', 'deleteJobService']);
    apiService.getJobServices.and.returnValue(of(services));
    apiService.deleteJobService.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [JobServiceComponent],
      imports: [RouterTestingModule, EntityListTableStubComponent],
      providers: [
        { provide: ApiJobServiceService, useValue: apiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JobServiceComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and load services', () => {
    expect(component).toBeTruthy();
    expect(apiService.getJobServices).toHaveBeenCalled();
    expect(component.dataloading).toBeFalse();
    const table = component.TableList as unknown as EntityListTableStubComponent;
    expect(table.initializeCalls[0]).toEqual(services);
  });

  it('should navigate to add form', () => {
    spyOn(router, 'navigate');
    component.onAddRecord();
    expect(router.navigate).toHaveBeenCalledWith(['job-service/form', 0]);
  });

  it('should navigate to edit form for a given id', () => {
    spyOn(router, 'navigate');
    component.onEdit(7);
    expect(router.navigate).toHaveBeenCalledWith(['job-service/form', 7]);
  });

  it('should delete service when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.onDelete(5);
    expect(apiService.deleteJobService).toHaveBeenCalledWith(5);
  });

  it('should skip delete when user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.onDelete(3);
    expect(apiService.deleteJobService).not.toHaveBeenCalledWith(3);
  });
});
