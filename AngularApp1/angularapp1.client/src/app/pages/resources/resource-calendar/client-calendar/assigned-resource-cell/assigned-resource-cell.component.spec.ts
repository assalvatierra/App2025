import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignedResourceCellComponent } from './assigned-resource-cell.component';

describe('AssignedResourceCellComponent', () => {
  let component: AssignedResourceCellComponent;
  let fixture: ComponentFixture<AssignedResourceCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedResourceCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedResourceCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display resources when provided', () => {
    const testResources = [
      {
        jobServiceResourceId: 1,
        resourceId: 100,
        resourceName: 'John Doe',
        resourceCode: 'DRV-001',
        resourceType: 'Driver',
        customerName: 'Test Customer',
        jobReference: 'JOB-001',
        dateFrom: new Date('2025-01-01'),
        dateTo: new Date('2025-01-07'),
        notes: 'Test notes'
      }
    ];

    component.resources = testResources;
    component.viewMode = 'expanded';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.cell-resource')).toBeTruthy();
    expect(compiled.querySelector('.resource-name').textContent).toContain('John Doe');
    expect(compiled.querySelector('.resource-code').textContent).toContain('DRV-001');
  });

  it('should not display content when no resources', () => {
    component.resources = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.cell-content')).toBeFalsy();
  });

  it('should generate tooltip text correctly', () => {
    const testResource = {
      jobServiceResourceId: 1,
      resourceId: 100,
      resourceName: 'John Doe',
      resourceCode: 'DRV-001',
      resourceType: 'Driver',
      customerName: 'Test Customer',
      jobReference: 'JOB-001',
      dateFrom: new Date('2025-01-01'),
      dateTo: new Date('2025-01-07'),
      notes: 'Test notes'
    };

    const tooltip = component.getResourceTooltip(testResource);
    expect(tooltip).toContain('Test Customer');
    expect(tooltip).toContain('JOB-001');
    expect(tooltip).toContain('John Doe');
    expect(tooltip).toContain('DRV-001');
    expect(tooltip).toContain('Driver');
  });

  it('should get correct initials', () => {
    expect(component.getResourceInitials('John Doe')).toBe('JD');
    expect(component.getResourceInitials('Vehicle')).toBe('VE');
    expect(component.getResourceInitials('')).toBe('?');
  });

  it('should get correct icon for resource type', () => {
    expect(component.getResourceIcon('Driver')).toBe('person');
    expect(component.getResourceIcon('Vehicle')).toBe('local_shipping');
    expect(component.getResourceIcon('Equipment')).toBe('construction');
  });
});
