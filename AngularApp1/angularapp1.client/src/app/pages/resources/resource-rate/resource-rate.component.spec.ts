import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResourceRateComponent } from './resource-rate.component';
import { ApiResourceRatesService } from '../../../core/services/api-resource-rates.service';

describe('ResourceRateComponent', () => {
  let component: ResourceRateComponent;
  let fixture: ComponentFixture<ResourceRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ResourceRateComponent
      ],
      providers: [ApiResourceRatesService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceRateComponent);
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
    expect(component.rateForm.get('isActive')).toBeDefined();
  });

  it('should show form when onAdd is called', () => {
    component.onAdd();
    expect(component.showForm).toBeTruthy();
    expect(component.editingRate).toBeNull();
  });

  it('should format date correctly', () => {
    const testDate = new Date('2024-01-15');
    const formatted = component.formatDate(testDate);
    expect(formatted).toBe(testDate.toLocaleDateString());
  });

  it('should format currency correctly', () => {
    const amount = 1234.56;
    const formatted = component.formatCurrency(amount);
    expect(formatted).toBe('$1,234.56');
  });
});