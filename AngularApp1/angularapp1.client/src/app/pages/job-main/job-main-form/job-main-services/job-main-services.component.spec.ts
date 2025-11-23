import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobMainServicesComponent } from './job-main-services.component';

describe('JobMainServicesComponent', () => {
  let component: JobMainServicesComponent;
  let fixture: ComponentFixture<JobMainServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobMainServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobMainServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
