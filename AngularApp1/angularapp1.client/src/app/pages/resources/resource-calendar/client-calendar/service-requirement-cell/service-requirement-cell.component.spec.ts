import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceRequirementCellComponent } from './service-requirement-cell.component';

describe('ServiceRequirementCellComponent', () => {
  let component: ServiceRequirementCellComponent;
  let fixture: ComponentFixture<ServiceRequirementCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRequirementCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRequirementCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display items when provided', () => {
    const testItems = [
      {
        customerId: 1,
        customerName: 'Test Customer',
        dateFrom: new Date('2025-01-01'),
        dateTo: new Date('2025-01-07'),
        itemType: 'Vehicle',
        requiredQty: 2,
        notes: 'Test notes',
        jobReference: 'JOB-001'
      }
    ];

    component.items = testItems;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.cell-item')).toBeTruthy();
    expect(compiled.querySelector('.item-type').textContent).toContain('Vehicle');
    expect(compiled.querySelector('.item-qty').textContent).toContain('2');
  });

  it('should not display content when no items', () => {
    component.items = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.cell-content')).toBeFalsy();
  });

  it('should generate tooltip text correctly', () => {
    const testItem = {
      customerId: 1,
      customerName: 'Test Customer',
      dateFrom: new Date('2025-01-01'),
      dateTo: new Date('2025-01-07'),
      itemType: 'Vehicle',
      requiredQty: 2,
      notes: 'Test notes',
      jobReference: 'JOB-001'
    };

    const tooltip = component.getItemTooltip(testItem);
    expect(tooltip).toContain('Test Customer');
    expect(tooltip).toContain('JOB-001');
    expect(tooltip).toContain('Vehicle');
    expect(tooltip).toContain('2');
    expect(tooltip).toContain('Test notes');
  });
});
