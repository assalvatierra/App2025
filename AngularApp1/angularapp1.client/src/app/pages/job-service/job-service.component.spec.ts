import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobServiceComponent } from './job-service.component';

describe('JobServiceComponent', () => {
  let component: JobServiceComponent;
  let fixture: ComponentFixture<JobServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
