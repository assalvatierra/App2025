import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { convertToParamMap } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ApiJobMainService } from '../../../../core/services/api-job-main.service';
import { JobMainDetailsComponent } from './job-main-details.component';

describe('JobMainDetailsComponent', () => {
  let component: JobMainDetailsComponent;
  let fixture: ComponentFixture<JobMainDetailsComponent>;
  let router: Router;
  let apiServiceSpy: jasmine.SpyObj<ApiJobMainService>;
  const activatedRouteStub = {
    snapshot: {
      paramMap: convertToParamMap({ id: '0' })
    }
  };

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj(ApiJobMainService.name, [
      'getJobMain',
      'updateJobMain',
      'addJobMain'
    ]);
    apiServiceSpy.getJobMain.and.returnValue(of({
      id: 1,
      jobDate: '2024-10-08',
      description: 'Test job',
      createdBy: 'System',
      lastEditBy: 'System',
      itemStatusId: 1,
      businessUnitId: 1
    }));
    apiServiceSpy.updateJobMain.and.returnValue(of({}));
    apiServiceSpy.addJobMain.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [JobMainDetailsComponent],
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
        { provide: ApiJobMainService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  const createComponent = (paramId: string) => {
    activatedRouteStub.snapshot.paramMap = convertToParamMap({ id: paramId });
    fixture = TestBed.createComponent(JobMainDetailsComponent);
    component = fixture.componentInstance;
    component['paramId'] = Number(paramId);
    component.TitleInfo = Number(paramId) === 0 ? 'Add New Job Main Form' : 'Edit Job Main Form';
    component.ShowAddBtn = Number(paramId) === 0;
    component.dataloading = false;
    fixture.detectChanges();
  };

  it('should create in add mode by default', () => {
    createComponent('0');
    expect(component).toBeTruthy();
    expect(component.ShowAddBtn).toBeTrue();
  });

  it('should navigate back to Jobs on cancel', () => {
    createComponent('0');
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/Jobs']);
  });
});
