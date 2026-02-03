import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ApiJobServiceService } from '../../../../core/services/api-job-service.service';
import { tableField } from '../../../../shared/models/entityListTableField';
import { JobMainServicesComponent } from './job-main-services.component';

@Component({
  selector: 'app-entity-list-table',
  template: '',
  standalone: true
})
class EntityListTableStubComponent {
  @Input() editTitle = '';
  @Input() showEditDetails = false;
  @Input() tableFields: tableField[] = [];
  @Output() addRecordClicked = new EventEmitter<void>();
  @Output() editRecordClicked = new EventEmitter<any>();
  initialize: jasmine.Spy<(param: any[]) => void> = jasmine.createSpy('initialize');
}

describe('JobMainServicesComponent', () => {
  let component: JobMainServicesComponent;
  let fixture: ComponentFixture<JobMainServicesComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiJobServiceService>;
  let router: Router;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  const activatedRouteStub = {
    snapshot: {
      paramMap: convertToParamMap({ id: '5' })
    }
  } as unknown as ActivatedRoute;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj(ApiJobServiceService.name, [
      'getJobsServiceByJobId',
      'deleteJobService'
    ]);
    apiServiceSpy.getJobsServiceByJobId.and.returnValue(of([{ id: 1 } as any]));
    apiServiceSpy.deleteJobService.and.returnValue(of({}));

    dialogSpy = jasmine.createSpyObj(MatDialog.name, ['open']);
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

    await TestBed.configureTestingModule({
      declarations: [JobMainServicesComponent],
      imports: [
        RouterTestingModule,
        MatCardModule,
        EntityListTableStubComponent
      ],
      providers: [
        { provide: ApiJobServiceService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(JobMainServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load job services', () => {
    expect(component).toBeTruthy();
    expect(apiServiceSpy.getJobsServiceByJobId).toHaveBeenCalled();
    const tableList = component.TableList as unknown as EntityListTableStubComponent;
    expect(tableList.initialize).toHaveBeenCalled();
  });

  it('should navigate to the add form', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onAddRecord();
    expect(navigateSpy).toHaveBeenCalledWith(['job-service/form', 0]);
  });

  it('should open the edit dialog', () => {
    component.onEdit(3);
    expect(dialogSpy.open).toHaveBeenCalled();
  });
});
