import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPeriodFormComponent } from './pay-period-form.component';

describe('PayPeriodFormComponent', () => {
  let component: PayPeriodFormComponent;
  let fixture: ComponentFixture<PayPeriodFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayPeriodFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayPeriodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
