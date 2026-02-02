import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { EntityFormPageComponent } from './entity-form-page.component';
import { ApiEntityService } from '../../../core/services/api-entity.service';
import { ApiService } from '../../../core/api.service';
import { ApiBusinessUnitService } from '../../../core/services/api-business-unit.service';
import { EntityService } from '../../../shared/entity.service';

describe('EntityFormPageComponent', () => {
  let component: EntityFormPageComponent;
  let fixture: ComponentFixture<EntityFormPageComponent>;
  let apiEntityService: jasmine.SpyObj<ApiEntityService>;
  let apiService: jasmine.SpyObj<ApiService>;
  let apiBusinessUnitService: jasmine.SpyObj<ApiBusinessUnitService>;
  let entityService: jasmine.SpyObj<EntityService>;

  beforeEach(async () => {
    const apiEntityServiceSpy = jasmine.createSpyObj('ApiEntityService', ['getEntity', 'addEntity', 'updateEntity']);
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getItemTypes', 'getItemStatuses', 'getCities']);
    const apiBusinessUnitServiceSpy = jasmine.createSpyObj('ApiBusinessUnitService', ['getList']);
    const entityServiceSpy = jasmine.createSpyObj('EntityService', ['getDefaultEntityFields']);

    await TestBed.configureTestingModule({
      declarations: [EntityFormPageComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: ApiEntityService, useValue: apiEntityServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ApiBusinessUnitService, useValue: apiBusinessUnitServiceSpy },
        { provide: EntityService, useValue: entityServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '0' // Default to 0 (new record mode)
              }
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    apiEntityService = TestBed.inject(ApiEntityService) as jasmine.SpyObj<ApiEntityService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    apiBusinessUnitService = TestBed.inject(ApiBusinessUnitService) as jasmine.SpyObj<ApiBusinessUnitService>;
    entityService = TestBed.inject(EntityService) as jasmine.SpyObj<EntityService>;

    // Setup default mock return values
    apiEntityServiceSpy.getEntity.and.returnValue(of({}));
    apiEntityServiceSpy.addEntity.and.returnValue(of({}));
    apiEntityServiceSpy.updateEntity.and.returnValue(of({}));
    apiServiceSpy.getItemTypes.and.returnValue(of([]));
    apiServiceSpy.getItemStatuses.and.returnValue(of([]));
    apiServiceSpy.getCities.and.returnValue(of([]));
    apiBusinessUnitServiceSpy.getList.and.returnValue(of([]));
    entityServiceSpy.getDefaultEntityFields.and.returnValue([]);

    fixture = TestBed.createComponent(EntityFormPageComponent);
    component = fixture.componentInstance;
    
    // Don't call detectChanges() here to avoid triggering ngAfterViewInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.dataloading).toBe(true);
    expect(component.cities).toEqual([]);
  });

  it('should initialize new entity when paramId is 0', () => {
    component.ngAfterViewInit();
    
    expect(component.currentData).toBeDefined();
    expect(component.currentData.id).toBe(0);
    expect(component.currentData.name).toBe('');
    expect(component.dataloading).toBe(false);
  });

  it('should load entity data when paramId is not 0', () => {
    const mockActivatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue('5');
    
    const mockEntity = {
      id: 5,
      name: 'Test Entity',
      description: 'Test Description'
    };
    apiEntityService.getEntity.and.returnValue(of(mockEntity));
    
    component.ngAfterViewInit();
    
    expect(apiEntityService.getEntity).toHaveBeenCalledWith(5);
  });

  it('should load cities on init', () => {
    const mockCities = [
      { id: 1, name: 'City 1' },
      { id: 2, name: 'City 2' }
    ];
    apiService.getCities.and.returnValue(of(mockCities));
    
    component.ngAfterViewInit();
    
    expect(apiService.getCities).toHaveBeenCalled();
  });

  it('should load business units on init', () => {
    component.ngAfterViewInit();
    
    expect(apiBusinessUnitService.getList).toHaveBeenCalled();
  });

  it('should load item types on init', () => {
    component.ngAfterViewInit();
    
    expect(apiService.getItemTypes).toHaveBeenCalled();
  });

  it('should load item statuses on init', () => {
    component.ngAfterViewInit();
    
    expect(apiService.getItemStatuses).toHaveBeenCalled();
  });
});
