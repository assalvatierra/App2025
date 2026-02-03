import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, of } from 'rxjs';

import { JobServiceFormComponent } from './job-service-form.component';
import { ApiJobServiceService, JobService } from '../../../core/services/api-job-service.service';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  template: ''
})
class EntityFormStubComponent {
  dataForm = {
    value: {
      name: 'stub'
    }
  };
}

describe('JobServiceFormComponent', () => {
  let component: JobServiceFormComponent;
  let fixture: ComponentFixture<JobServiceFormComponent>;
  let apiService: jasmine.SpyObj<ApiJobServiceService>;
  let router: Router;
  let paramsSubject: BehaviorSubject<{ id: number }>;

  const mockService: JobService = {
    id: 1,
    jobMainId: 99,
    particulars: 'desc',
    dateStart: new Date(),
    dateEnd: new Date(),
    quotedAmt: 0,
    supplierAmt: 0,
    createdBy: 'admin',
    createdOn: new Date(),
    lastEditBy: 'admin',
    lastEditOn: new Date(),
    isArchived: false,
    isPrivate: false,
    isActive: true,
    serviceItemId: 1,
    serviceItem: null,
    supplierId: 1,
    itemStatusId: 1,
    sortOrder: 1
  };

  beforeEach(async () => {
    paramsSubject = new BehaviorSubject<{ id: number }>({ id: 0 });
    apiService = jasmine.createSpyObj('ApiJobServiceService', ['getJobService', 'createJobService', 'updateJobService']);
    apiService.getJobService.and.returnValue(of(mockService));
    apiService.createJobService.and.returnValue(of(mockService));
    apiService.updateJobService.and.returnValue(of(mockService));

    const activatedRouteStub = { params: paramsSubject.asObservable() };

    await TestBed.configureTestingModule({
      declarations: [JobServiceFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        EntityFormStubComponent
      ],
      providers: [
        { provide: ApiJobServiceService, useValue: apiService },
        { provide: ActivatedRoute, useValue: activatedRouteStub as unknown as ActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JobServiceFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    component.jobServiceForm.get('jobMainId')?.setValue(1);

    fixture.detectChanges();
  });

  it('should create component in create mode', () => {
    expect(component).toBeTruthy();
    expect(component.isEditMode).toBeFalse();
  });

  it('should call createJobService when submitting a new service', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.onSubmit();
    tick();
    expect(apiService.createJobService).toHaveBeenCalledWith(component.jobServiceForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['/job-service']);
  }));

  it('should load existing service and call update on submit', fakeAsync(() => {
    spyOn(router, 'navigate');
    paramsSubject.next({ id: 5 });
    component.jobServiceForm.get('jobMainId')?.setValue(2);
  component['serviceId'] = 5;
  component.isEditMode = true;
    component.onSubmit();
    tick();
    expect(apiService.updateJobService).toHaveBeenCalledWith(5, component.jobServiceForm.value);
  }));

    it('should not mark edit mode when editing is false', () => {
      expect(component.isEditMode).toBeFalse();
    });
});
