import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitFormComponent } from './business-unit-form.component';

describe('BusinessUnitFormComponent', () => {
  let component: BusinessUnitFormComponent;
  let fixture: ComponentFixture<BusinessUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessUnitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
