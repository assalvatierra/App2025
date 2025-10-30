import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobMainFormComponent } from './job-main-form.component';

describe('JobMainFormComponent', () => {
  let component: JobMainFormComponent;
  let fixture: ComponentFixture<JobMainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobMainFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobMainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
