import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPeriodDialogComponent } from './pay-period-dialog.component';

describe('PayPeriodDialogComponent', () => {
  let component: PayPeriodDialogComponent;
  let fixture: ComponentFixture<PayPeriodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayPeriodDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayPeriodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
