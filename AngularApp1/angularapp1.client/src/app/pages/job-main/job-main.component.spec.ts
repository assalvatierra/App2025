import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';

import { ApiJobMainService } from '../../core/services/api-job-main.service';
import { tableField } from '../../shared/models/entityListTableField';
import { JobMainComponent } from './job-main.component';

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

@Component({
  selector: 'ui-page-title',
  template: '',
  standalone: true
})
class UiPageTitleStubComponent {
  @Input() title = '';
}

const jobMainRecords = [
  {
    id: 1,
    jobDate: '2024-10-08',
    description: 'Test job',
    createdOn: '2024-10-01',
    createdBy: 'System',
    lastEditOn: '2024-10-02',
    lastEditBy: 'System',
    itemStatusId: 1,
    businessUnitId: 2
  }
];

describe('JobMainComponent', () => {
  let component: JobMainComponent;
  let fixture: ComponentFixture<JobMainComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiJobMainService>;
  let router: Router;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj(ApiJobMainService.name, ['getJobMains']);
    apiServiceSpy.getJobMains.and.returnValue(of(jobMainRecords));

    TestBed.overrideComponent(JobMainComponent, {
      set: {
        imports: [
          MatCardModule,
          EntityListTableStubComponent,
          UiPageTitleStubComponent
        ]
      }
    });

    await TestBed.configureTestingModule({
      imports: [
        JobMainComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: ApiJobMainService, useValue: apiServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobMainComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and initialize the job table', () => {
    expect(component).toBeTruthy();
    expect(apiServiceSpy.getJobMains).toHaveBeenCalled();
  const tableList = component.TableList as unknown as EntityListTableStubComponent;
  expect(tableList.initialize).toHaveBeenCalledWith(jobMainRecords);
    expect(component.dataloading).toBeFalse();
  });

  it('should expose the configured table fields', () => {
    const keys = component.tableFields.map(field => field.key);
    expect(keys).toContain('id');
    expect(keys).toContain('businessUnitId');
    expect(keys.length).toBeGreaterThan(0);
  });

  it('should navigate to the add route', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onAddRecord();
    expect(navigateSpy).toHaveBeenCalledWith(['jobs/form', 0]);
  });

  it('should navigate to the edit route with the provided id', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onEdit(42);
    expect(navigateSpy).toHaveBeenCalledWith(['jobs/form', 42]);
  });
});
