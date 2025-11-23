import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobMainServiceDialogComponent } from './job-main-service-dialog.component';

describe('JobMainServiceDialogComponent', () => {
  let component: JobMainServiceDialogComponent;
  let fixture: ComponentFixture<JobMainServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobMainServiceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobMainServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
