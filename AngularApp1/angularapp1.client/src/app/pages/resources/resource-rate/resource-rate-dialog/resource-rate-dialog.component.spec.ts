import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResourceRateDialogComponent, ResourceRateDialogData } from './resource-rate-dialog.component';
import { ApiResourceRatesService } from '../../../../core/services/api-resource-rates.service';

describe('ResourceRateDialogComponent', () => {
  let component: ResourceRateDialogComponent;
  let fixture: ComponentFixture<ResourceRateDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  const mockData: ResourceRateDialogData = {
    resourceId: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ResourceRateDialogComponent
      ],
      providers: [
        ApiResourceRatesService,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on component creation', () => {
    expect(component.rateForm).toBeDefined();
    expect(component.rateForm.get('validFrom')).toBeDefined();
    expect(component.rateForm.get('validTo')).toBeDefined();
    expect(component.rateForm.get('daily')).toBeDefined();
    expect(component.rateForm.get('hourly')).toBeDefined();
    expect(component.rateForm.get('monthly')).toBeDefined();
    expect(component.rateForm.get('percent')).toBeDefined();
    expect(component.rateForm.get('otRate')).toBeDefined();
  });

  it('should set isEdit to false when no resourceRate is provided', () => {
    expect(component.isEdit).toBeFalse();
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});