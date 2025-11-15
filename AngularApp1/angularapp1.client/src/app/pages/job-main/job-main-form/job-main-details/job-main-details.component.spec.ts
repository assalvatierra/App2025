import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobMainDetailsComponent } from './job-main-details.component';

describe('JobMainDetailsComponent', () => {
  let component: JobMainDetailsComponent;
  let fixture: ComponentFixture<JobMainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobMainDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobMainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
