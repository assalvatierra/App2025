import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CountriesComponent } from './countries.component';
import { ApiService } from '../../core/api.service';
import { EntityService } from '../../shared/entity.service';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;
  let entityService: jasmine.SpyObj<EntityService>;

  const mockCountriesData = [
    {
      id: 1,
      name: 'United States',
      description: 'USA',
      remarks: 'North America',
      code: 'US',
      sortOrder: 1
    },
    {
      id: 2,
      name: 'Canada',
      description: 'CAN',
      remarks: 'North America',
      code: 'CA',
      sortOrder: 2
    },
    {
      id: 3,
      name: 'United Kingdom',
      description: 'UK',
      remarks: 'Europe',
      code: 'GB',
      sortOrder: 3
    }
  ];

  const mockTableFields = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    { key: 'description', label: 'Description' }
  ];

  beforeEach(waitForAsync(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getCountries']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const entityServiceSpy = jasmine.createSpyObj('EntityService', ['getDefaultEntityFields']);

    TestBed.configureTestingModule({
      declarations: [CountriesComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: EntityService, useValue: entityServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore child component errors
    });

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    entityService = TestBed.inject(EntityService) as jasmine.SpyObj<EntityService>;
    
    // Setup default mock return values
    entityServiceSpy.getDefaultEntityFields.and.returnValue([...mockTableFields, { key: 'sortOrder', label: 'Sort Order' }]);
  }));

  beforeEach(() => {
    apiService.getCountries.and.returnValue(of(mockCountriesData));
    
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    
    // Create a mock for TableList that will be assigned after ViewChild initialization
    const mockTableList = jasmine.createSpyObj('EntityListTableComponent', ['initialize']);
    component.TableList = mockTableList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.showEdit).toBe(true);
    expect(component.dataloading).toBe(true);
  });

  describe('ngAfterViewInit', () => {
    it('should call retrieveApiData on initialization', () => {
      spyOn<any>(component, 'retrieveApiData');
      
      component.ngAfterViewInit();
      
      expect(component['retrieveApiData']).toHaveBeenCalled();
    });
  });

  describe('API Data Retrieval', () => {
    it('should load countries data successfully', fakeAsync(() => {
      spyOn(console, 'log');
      
      component.ngAfterViewInit();
      tick();
      
      expect(apiService.getCountries).toHaveBeenCalled();
      expect(component.dataloading).toBe(false);
      expect(component.TableList.initialize).toHaveBeenCalledWith(jasmine.any(Array));
      expect(console.log).toHaveBeenCalledWith('API call complete');
    }));

    it('should handle API error gracefully', fakeAsync(() => {
      const errorResponse = { message: 'API Error' };
      apiService.getCountries.and.returnValue(throwError(() => errorResponse));
      
      spyOn(console, 'error');
      
      component.ngAfterViewInit();
      tick();
      
      expect(apiService.getCountries).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('API Error:', errorResponse);
      // Note: RxJS throwError does NOT trigger complete(), only error()
      // So dataloading will remain true unless error handler sets it to false
      expect(component.dataloading).toBe(true);
    }));

    it('should set dataloading to false when API call completes', fakeAsync(() => {
      spyOn(console, 'log');
      
      component.ngAfterViewInit();
      tick();
      
      expect(console.log).toHaveBeenCalledWith('API call complete');
      expect(component.dataloading).toBe(false);
    }));

    it('should initialize EntityListTable with data', fakeAsync(() => {
      component.ngAfterViewInit();
      tick();
      
      expect(component.TableList.initialize).toHaveBeenCalledWith(jasmine.any(Array));
    }));
  });

  describe('Event Handlers', () => {
    it('should navigate to form with id 0 when onAddRecord is called', () => {
      spyOn(console, 'log');
      
      component.onAddRecord();
      
      expect(router.navigate).toHaveBeenCalledWith(['/references/countries/form', 0]);
      expect(console.log).toHaveBeenCalledWith('Add record clicked');
    });

    it('should navigate to form with correct id when onEdit is called', () => {
      const testId = 5;
      spyOn(console, 'log');
      
      component.onEdit(testId);
      
      expect(router.navigate).toHaveBeenCalledWith(['/references/countries/form', testId]);
      expect(console.log).toHaveBeenCalledWith('Edit record clicked', testId);
    });

    it('should log to console when onEditDetails is called', () => {
      const testParam = { id: 10, name: 'Test Country' };
      spyOn(console, 'log');
      
      component.onEditDetails(testParam);
      
      expect(console.log).toHaveBeenCalledWith('Edit details clicked', testParam);
    });

    it('should log to console when onArchive is called', () => {
      const testParam = { id: 15 };
      spyOn(console, 'log');
      
      component.onArchive(testParam);
      
      expect(console.log).toHaveBeenCalledWith('Archive clicked', testParam);
    });
  });

  describe('Table Fields', () => {
    it('should return table fields without sortOrder field', () => {
      const fields = component.tableFields;
      
      expect(fields).toBeDefined();
      expect(fields.length).toBeGreaterThan(0);
      
      const hasSortOrderField = fields.some(field => field.key === 'sortOrder');
      expect(hasSortOrderField).toBe(false);
    });

    it('should get table fields from entity service', () => {
      const fields = component.tableFields;
      
      expect(entityService.getDefaultEntityFields).toHaveBeenCalled();
      expect(fields).toBeDefined();
    });

    it('should filter out sortOrder field from default entity fields', () => {
      const fields = component.tableFields;
      const fieldKeys = fields.map(f => f.key);
      
      expect(fieldKeys).not.toContain('sortOrder');
      expect(fieldKeys).toContain('id');
      expect(fieldKeys).toContain('name');
    });
  });

  describe('Component Lifecycle', () => {
    it('should set dataloading to true before API call', () => {
      expect(component.dataloading).toBe(true);
    });

    it('should have showEdit enabled by default', () => {
      expect(component.showEdit).toBe(true);
    });
  });
});
