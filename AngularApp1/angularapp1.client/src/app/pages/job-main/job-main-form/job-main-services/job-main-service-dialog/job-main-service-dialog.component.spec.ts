import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ApiJobServiceService } from '../../../../../core/services/api-job-service.service';
import { ApiService } from '../../../../../core/api.service';
import { JobMainServiceDialogComponent } from './job-main-service-dialog.component';

describe('JobMainServiceDialogComponent', () => {
  let component: JobMainServiceDialogComponent;
  let fixture: ComponentFixture<JobMainServiceDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<JobMainServiceDialogComponent>>;
  let apiServiceSpy: jasmine.SpyObj<ApiJobServiceService>;
  let lookupServiceSpy: jasmine.SpyObj<ApiService>;

  const jobServiceMock = {
    id: 1,
    jobMainId: 2,
    particulars: 'Test',
    dateStart: new Date('2024-10-08'),
    dateEnd: new Date('2024-10-10'),
    quotedAmt: 0,
    supplierAmt: 0,
    createdBy: 'System',
    createdOn: new Date('2024-10-08'),
    lastEditBy: 'System',
    lastEditOn: new Date('2024-10-08'),
    isArchived: false,
    isPrivate: false,
    isActive: true,
    serviceItemId: 1,
    serviceItem: {},
    supplierId: 1,
    itemStatusId: 1,
    sortOrder: 0
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    apiServiceSpy = jasmine.createSpyObj(ApiJobServiceService.name, [
      'getJobService',
      'updateJobService',
      'createJobService'
    ]);
    apiServiceSpy.getJobService.and.returnValue(of(jobServiceMock));
    apiServiceSpy.updateJobService.and.returnValue(of({}));
    apiServiceSpy.createJobService.and.returnValue(of(jobServiceMock));

    lookupServiceSpy = jasmine.createSpyObj(ApiService.name, ['getServiceItems', 'getItemStatuses']);
    lookupServiceSpy.getServiceItems.and.returnValue(of([{ id: 1, description: 'Service' }]));
    lookupServiceSpy.getItemStatuses.and.returnValue(of([{ id: 1, description: 'Active' }]));

    await TestBed.configureTestingModule({
      declarations: [JobMainServiceDialogComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { serviceId: 0 } },
        { provide: ApiJobServiceService, useValue: apiServiceSpy },
        { provide: ApiService, useValue: lookupServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JobMainServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.jobServiceForm).toBeTruthy();
  });

  it('should close the dialog on cancel', () => {
    component.onCancelClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
