import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { EntityComponent } from './entity.component';
import { ApiEntityService } from '../../core/services/api-entity.service';
import { EntityService } from '../../shared/entity.service';

describe('EntityComponent', () => {
  let component: EntityComponent;
  let fixture: ComponentFixture<EntityComponent>;
  let apiEntityService: jasmine.SpyObj<ApiEntityService>;
  let router: jasmine.SpyObj<Router>;
  let entityService: jasmine.SpyObj<EntityService>;

  const mockEntitiesData = [
    {
      id: 1,
      name: 'Entity 1',
      description: 'Description 1',
      remarks: 'Remarks 1',
      code: 'E001',
      sortOrder: 1,
      contactNo1: '123-456-7890',
      contactNo2: '098-765-4321',
      email1: 'entity1@test.com',
      address1: '123 Main St'
    },
    {
      id: 2,
      name: 'Entity 2',
      description: 'Description 2',
      remarks: 'Remarks 2',
      code: 'E002',
      sortOrder: 2,
      contactNo1: '111-222-3333',
      contactNo2: '444-555-6666',
      email1: 'entity2@test.com',
      address1: '456 Oak Ave'
    }
  ];

  const mockDefaultEntityFields = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    { key: 'description', label: 'Description' }
  ];

  const mockContactFields = [
    { key: 'id', label: 'ID' },
    { key: 'contactNo1', label: 'Contact No 1' },
    { key: 'contactNo2', label: 'Contact No 2' },
    { key: 'email1', label: 'Email' }
  ];

  beforeEach(async () => {
    const apiEntityServiceSpy = jasmine.createSpyObj('ApiEntityService', ['getEntities', 'deleteEntity']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const entityServiceSpy = jasmine.createSpyObj('EntityService', ['getDefaultEntityFields', 'getDefaultContactInfoFields']);

    await TestBed.configureTestingModule({
      declarations: [EntityComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ApiEntityService, useValue: apiEntityServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: EntityService, useValue: entityServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    apiEntityService = TestBed.inject(ApiEntityService) as jasmine.SpyObj<ApiEntityService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    entityService = TestBed.inject(EntityService) as jasmine.SpyObj<EntityService>;

    // Setup default mock return values
    apiEntityServiceSpy.getEntities.and.returnValue(of(mockEntitiesData));
    apiEntityServiceSpy.deleteEntity.and.returnValue(of({}));
    entityServiceSpy.getDefaultEntityFields.and.returnValue([...mockDefaultEntityFields]);
    entityServiceSpy.getDefaultContactInfoFields.and.returnValue([...mockContactFields]);

    fixture = TestBed.createComponent(EntityComponent);
    component = fixture.componentInstance;
    
    // Create a mock for TableList
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
    it('should load entities data successfully', fakeAsync(() => {
      spyOn(console, 'log');
      
      component.ngAfterViewInit();
      tick();
      
      expect(apiEntityService.getEntities).toHaveBeenCalled();
      expect(component.dataloading).toBe(false);
      expect(component.TableList.initialize).toHaveBeenCalledWith(jasmine.any(Array));
      expect(console.log).toHaveBeenCalledWith('API call complete');
    }));

    it('should handle API error gracefully', fakeAsync(() => {
      const errorResponse = { message: 'API Error' };
      apiEntityService.getEntities.and.returnValue(throwError(() => errorResponse));
      
      spyOn(console, 'error');
      
      component.ngAfterViewInit();
      tick();
      
      expect(apiEntityService.getEntities).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('API Error:', errorResponse);
      expect(component.dataloading).toBe(true); // Remains true on error
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
      
      expect(router.navigate).toHaveBeenCalledWith(['entities/form', 0]);
      expect(console.log).toHaveBeenCalledWith('Add record clicked');
    });

    it('should navigate to form with correct id when onEdit is called', () => {
      const testId = 5;
      spyOn(console, 'log');
      
      component.onEdit(testId);
      
      expect(router.navigate).toHaveBeenCalledWith(['entities/form', testId]);
      expect(console.log).toHaveBeenCalledWith('Edit record clicked', testId);
    });

    it('should log to console when onEditDetails is called', () => {
      const testParam = { id: 10, name: 'Test Entity' };
      spyOn(console, 'log');
      
      component.onEditDetails(testParam);
      
      expect(console.log).toHaveBeenCalledWith('Edit details clicked', testParam);
    });

    describe('onArchive', () => {
      it('should delete entity when user confirms', fakeAsync(() => {
        const testId = 15;
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(console, 'log');
        spyOn<any>(component, 'retrieveApiData');
        
        component.onArchive(testId);
        tick();
        
        expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this entity?');
        expect(apiEntityService.deleteEntity).toHaveBeenCalledWith(testId);
        expect(console.log).toHaveBeenCalledWith('Entity deleted successfully');
        expect(component['retrieveApiData']).toHaveBeenCalled();
      }));

      it('should not delete entity when user cancels', () => {
        const testId = 15;
        spyOn(window, 'confirm').and.returnValue(false);
        
        component.onArchive(testId);
        
        expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this entity?');
        expect(apiEntityService.deleteEntity).not.toHaveBeenCalled();
      });

      it('should handle delete error gracefully', fakeAsync(() => {
        const testId = 15;
        const errorResponse = { message: 'Delete Error' };
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(window, 'alert');
        spyOn(console, 'error');
        apiEntityService.deleteEntity.and.returnValue(throwError(() => errorResponse));
        
        component.onArchive(testId);
        tick();
        
        expect(console.error).toHaveBeenCalledWith('Delete error:', errorResponse);
        expect(window.alert).toHaveBeenCalledWith('Failed to delete entity');
        expect(component.dataloading).toBe(false);
      }));
    });
  });

  describe('Table Fields', () => {
    it('should return combined entity and contact fields', () => {
      const fields = component.tableFields;
      
      expect(fields).toBeDefined();
      expect(fields.length).toBeGreaterThan(0);
      expect(entityService.getDefaultEntityFields).toHaveBeenCalled();
      expect(entityService.getDefaultContactInfoFields).toHaveBeenCalled();
    });

    it('should filter out duplicate id field from contact fields', () => {
      const fields = component.tableFields;
      
      // Count how many times 'id' appears
      const idFields = fields.filter(f => f.key === 'id');
      expect(idFields.length).toBe(1); // Should only appear once
    });

    it('should update contactNo2 label to "Alt Contact"', () => {
      const fields = component.tableFields;
      
      const contactNo2Field = fields.find(f => f.key === 'contactNo2');
      expect(contactNo2Field).toBeDefined();
      expect(contactNo2Field?.label).toBe('Alt Contact');
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
