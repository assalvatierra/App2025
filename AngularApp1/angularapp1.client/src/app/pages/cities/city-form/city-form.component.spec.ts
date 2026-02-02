import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CityFormComponent } from './city-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CityFormComponent', () => {
  let component: CityFormComponent;
  let fixture: ComponentFixture<CityFormComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getCity', 'addCity', 'updateCity']);
    
    await TestBed.configureTestingModule({
      declarations: [CityFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
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
      schemas: [NO_ERRORS_SCHEMA] // Ignore child component template errors
    })
      .compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    
    // Setup default mock return values
    apiServiceSpy.getCity.and.returnValue(of({}));
    apiServiceSpy.addCity.and.returnValue(of({}));
    apiServiceSpy.updateCity.and.returnValue(of({}));

    fixture = TestBed.createComponent(CityFormComponent);
    component = fixture.componentInstance;
    
    // Don't call detectChanges() here to avoid triggering ngAfterViewInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.dataloading).toBe(true);
    expect(component.ShowAddBtn).toBe(false);
    expect(component.TitleInfo).toBe('Edit Country Form');
  });

  it('should set title to "Add New City Form" when paramId is 0', () => {
    component.ngAfterViewInit();
    
    expect(component.TitleInfo).toBe('Add New City Form');
    expect(component.ShowAddBtn).toBe(true);
    expect(component.dataloading).toBe(false);
  });

  it('should set title to "Edit City Form" when paramId is not 0', () => {
    // Mock ActivatedRoute to return a non-zero id
    const mockActivatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue('5');
    
    component.ngAfterViewInit();
    
    expect(component.TitleInfo).toBe('Edit City Form');
    expect(apiService.getCity).toHaveBeenCalledWith(5);
  });

  it('should initialize currentData when paramId is 0', () => {
    component.ngAfterViewInit();
    
    expect(component.currentData).toEqual({
      id: 0,
      name: '',
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0
    });
  });
});
