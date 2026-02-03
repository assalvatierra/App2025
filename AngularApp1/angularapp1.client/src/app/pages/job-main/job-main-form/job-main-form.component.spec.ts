import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { convertToParamMap } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { JobMainFormComponent } from './job-main-form.component';

@Component({
  selector: 'app-job-main-details',
  template: '',
  standalone: true
})
class JobMainDetailsStubComponent {
  @Output() descriptionChanged = new EventEmitter<string>();
}

@Component({
  selector: 'app-job-main-customer',
  template: '',
  standalone: true
})
class JobMainCustomerStubComponent {
  @Input() jobMainId = 0;
}

@Component({
  selector: 'app-job-main-services',
  template: '',
  standalone: true
})
class JobMainServicesStubComponent {}

describe('JobMainFormComponent', () => {
  let fixture: ComponentFixture<JobMainFormComponent>;
  let component: JobMainFormComponent;
  let router: Router;
  const activatedRouteStub = {
    snapshot: {
      paramMap: convertToParamMap({ id: '0' })
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        JobMainFormComponent
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        NoopAnimationsModule,
        JobMainDetailsStubComponent,
        JobMainCustomerStubComponent,
        JobMainServicesStubComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  const createComponent = (paramId: string) => {
    activatedRouteStub.snapshot.paramMap = convertToParamMap({ id: paramId });
    fixture = TestBed.createComponent(JobMainFormComponent);
    component = fixture.componentInstance;
    component.paramId = Number(paramId);
    component.TitleInfo = Number(paramId) === 0 ? 'Create Job Order' : 'Edit Job Order';
    fixture.detectChanges();
  };

  it('should create with a create title by default', () => {
    createComponent('0');
    expect(component).toBeTruthy();
    expect(component.TitleInfo).toBe('Create Job Order');
  });

  it('should set the edit title when id is non-zero', () => {
    createComponent('12');
    expect(component.TitleInfo).toBe('Edit Job Order');
  });

  it('should update the job description when details emit', () => {
    createComponent('0');
    component.onDescriptionChanged('New description');
    expect(component.jobDescription).toBe('New description');
  });

  it('should navigate back to Jobs on cancel', () => {
    createComponent('0');
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/Jobs']);
  });
});
