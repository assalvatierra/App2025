import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { ItemStatusComponent } from './itemstatus.component';
import { ApiService } from '../../core/api.service';
import { EntityService } from '../../shared/entity.service';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-entity-list-table',
  standalone: true,
  template: ''
})
class EntityListTableStubComponent {
  @Input() showEdit = true;
  @Input() editTitle?: string;
  @Input() tableFields: any[] = [];
  @Output() addRecordClicked = new EventEmitter<void>();
  @Output() editRecordClicked = new EventEmitter<any>();
  @Output() onEditDetails = new EventEmitter<any>();
  @Output() onArchiveRecord = new EventEmitter<any>();

  public initializeCalls: any[][] = [];

  initialize(data: any[]) {
    this.initializeCalls.push(data);
  }
}

@Component({
  selector: 'ui-page-title',
  standalone: true,
  template: ''
})
class UiPageTitleStubComponent {
  @Input() title?: string;
}

describe('ItemStatusComponent', () => {
  let component: ItemStatusComponent;
  let fixture: ComponentFixture<ItemStatusComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;

  const statuses = [
    { id: 1, name: 'Active', description: 'Active status', remarks: '', code: 'ACT', sortOrder: 1, itemStatusClassId: 1 },
    { id: 2, name: 'Inactive', description: 'Inactive status', remarks: '', code: 'INA', sortOrder: 2, itemStatusClassId: 2 },
    { id: 3, name: 'Pending', description: 'Pending status', remarks: '', code: 'PEN', sortOrder: 3, itemStatusClassId: 1 }
  ];

  const statusClasses = [
    { id: 1, name: 'General', description: 'General class', code: 'GEN', sortOrder: 1 },
    { id: 2, name: 'Sample', description: 'Sample class', code: 'SAM', sortOrder: 2 }
  ];

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['getItemStatuses', 'getItemStatusClasses', 'getItemStatusesByClassName']);
    apiService.getItemStatuses.and.returnValue(of(statuses));
    apiService.getItemStatusClasses.and.returnValue(of(statusClasses));
    apiService.getItemStatusesByClassName.and.returnValue(of(statuses.filter(s => s.itemStatusClassId === 1)));

    await TestBed.configureTestingModule({
      declarations: [ItemStatusComponent],
      imports: [
        RouterTestingModule, 
        MatCardModule, 
        MatSelectModule, 
        MatFormFieldModule,
        BrowserAnimationsModule,
        EntityListTableStubComponent, 
        UiPageTitleStubComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: EntityService, useValue: jasmine.createSpyObj('EntityService', ['getDefaultEntityFields']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemStatusComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    // Don't run detectChanges here - let each test control it
  });

  it('should create and initialize the list', fakeAsync(() => {
    fixture.detectChanges(); // Triggers ngAfterViewInit
    tick(); // Wait for async operations
    fixture.detectChanges(); // Apply changes from async calls
    
    expect(component).toBeTruthy();
    expect(apiService.getItemStatuses).toHaveBeenCalled();
    expect(component.dataloading).toBeFalse();
    const table = component.TableList as unknown as EntityListTableStubComponent;
    expect(table.initializeCalls[0]).toEqual(statuses);
  }));

  it('should load status classes on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges(); // Second detection to catch async changes
    
    expect(apiService.getItemStatusClasses).toHaveBeenCalled();
    expect(component.itemStatusClasses).toEqual(statusClasses);
  }));

  it('should display status classes in dropdown', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges(); // Second detection to catch async changes
    
    const compiled = fixture.nativeElement as HTMLElement;
    const select = compiled.querySelector('mat-select');
    expect(select).toBeTruthy();
    expect(component.itemStatusClasses.length).toBe(2);
    expect(component.itemStatusClasses[0].name).toBe('General');
    expect(component.itemStatusClasses[1].name).toBe('Sample');
  }));

  it('should filter items when status class is selected', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    component.selectedItemStatusClassName = 'General';
    component.onItemStatusClassChange();
    tick();
    
    expect(apiService.getItemStatusesByClassName).toHaveBeenCalledWith('General');
  }));

  it('should show all items when "All" is selected', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    component.selectedItemStatusClassName = '';
    component.onItemStatusClassChange();
    tick();
    
    expect(apiService.getItemStatuses).toHaveBeenCalled();
  }));

  it('should apply client-side filter when server-side fails', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    // Load all items first to populate the cache
    component.selectedItemStatusClassName = '';
    component.retrieveApiData();
    tick();
    fixture.detectChanges();
    
    // Now make the server-side filter fail
    apiService.getItemStatusesByClassName.and.returnValue(
      throwError(() => ({ status: 500, statusText: 'Internal Server Error' }))
    );
    
    // Try to filter - should fallback to client-side
    component.selectedItemStatusClassName = 'General';
    component.onItemStatusClassChange();
    tick();
    fixture.detectChanges();
    
    // Should complete without throwing and set dataloading to false
    expect(component.dataloading).toBeFalse();
  }));

  it('should navigate to add form', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    spyOn(router, 'navigate');
    component.onAddRecord();
    expect(router.navigate).toHaveBeenCalledWith(['/references/itemstatus/form', 0]);
  }));

  it('should navigate to edit form', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    spyOn(router, 'navigate');
    component.onEdit(5);
    expect(router.navigate).toHaveBeenCalledWith(['/references/itemstatus/form', 5]);
  }));

  it('should filter grid data when status class is selected', fakeAsync(() => {
    // Setup filtered data - only items with itemStatusClassId = 1 (General)
    const filteredStatuses = [
      { id: 1, name: 'Active', description: 'Active status', remarks: '', code: 'ACT', sortOrder: 1, itemStatusClassId: 1 },
      { id: 3, name: 'Pending', description: 'Pending status', remarks: '', code: 'PEN', sortOrder: 3, itemStatusClassId: 1 }
    ];
    
    apiService.getItemStatusesByClassName.and.returnValue(of(filteredStatuses));
    
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    // Initially, all 3 statuses should be loaded
    const table = component.TableList as unknown as EntityListTableStubComponent;
    expect(table.initializeCalls[0]).toEqual(statuses);
    expect(table.initializeCalls[0].length).toBe(3);
    
    // Select "General" class
    component.selectedItemStatusClassName = 'General';
    component.onItemStatusClassChange();
    tick();
    fixture.detectChanges();
    
    // Verify API was called with correct class name
    expect(apiService.getItemStatusesByClassName).toHaveBeenCalledWith('General');
    
    // Verify grid was updated with filtered data (only 2 items)
    expect(table.initializeCalls.length).toBe(2); // Initial load + filtered load
    expect(table.initializeCalls[1]).toEqual(filteredStatuses);
    expect(table.initializeCalls[1].length).toBe(2);
    
    // Verify the filtered items are the correct ones
    const filteredData = table.initializeCalls[1];
    expect(filteredData.every((item: any) => item.itemStatusClassId === 1)).toBeTrue();
  }));

  it('should restore all grid data when "All" is selected after filtering', fakeAsync(() => {
    // Setup filtered data
    const filteredStatuses = [
      { id: 1, name: 'Active', description: 'Active status', remarks: '', code: 'ACT', sortOrder: 1, itemStatusClassId: 1 }
    ];
    
    apiService.getItemStatusesByClassName.and.returnValue(of(filteredStatuses));
    
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    const table = component.TableList as unknown as EntityListTableStubComponent;
    
    // First filter by "General"
    component.selectedItemStatusClassName = 'General';
    component.onItemStatusClassChange();
    tick();
    fixture.detectChanges();
    
    expect(table.initializeCalls[1].length).toBe(1);
    
    // Then select "All" to restore full list
    component.selectedItemStatusClassName = '';
    component.onItemStatusClassChange();
    tick();
    fixture.detectChanges();
    
    // Verify getItemStatuses was called again
    expect(apiService.getItemStatuses).toHaveBeenCalledTimes(2); // Initial + restore
    
    // Verify all 3 items are back in the grid
    expect(table.initializeCalls[2]).toEqual(statuses);
    expect(table.initializeCalls[2].length).toBe(3);
  }));
});
