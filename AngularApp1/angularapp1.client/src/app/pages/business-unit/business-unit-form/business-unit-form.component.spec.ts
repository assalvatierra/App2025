import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { BusinessUnitFormComponent } from './business-unit-form.component';
import { ApiBusinessUnitService } from '../../../core/services/api-business-unit.service';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

describe('BusinessUnitFormComponent', () => {
  let component: BusinessUnitFormComponent;
  let fixture: ComponentFixture<BusinessUnitFormComponent>;
  let router: Router;
  let apiService: jasmine.SpyObj<ApiBusinessUnitService>;

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: () => '0'
      }
    }
  };

  beforeEach(async () => {
  apiService = jasmine.createSpyObj('ApiBusinessUnitService', ['getItem', 'addItem', 'updateItem', 'deleteItem']);
    apiService.getItem.and.returnValue(of({
      id: 1,
      name: 'Business Unit',
      description: 'Description',
      remarks: '',
      code: 'B01',
      sortOrder: 1
    }));
    apiService.addItem.and.returnValue(of({}));
    apiService.updateItem.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [BusinessUnitFormComponent, EntityFormComponent],
      imports: [
  RouterTestingModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule
      ],
      providers: [
        { provide: ApiBusinessUnitService, useValue: apiService },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessUnitFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.TitleInfo = 'Add New Business Unit Form';
    component.dataloading = false;
    component.ShowAddBtn = true;
    component.currentData = {
      id: 0,
      name: '',
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0
    };
    component['paramId'] = 0;
    fixture.detectChanges();
  });

  it('should create component configured for new business unit', () => {
    expect(component).toBeTruthy();
    expect(component.ShowAddBtn).toBeTrue();
    expect(component.TitleInfo).toContain('Add New');
    expect(component.dataloading).toBeFalse();
  });

  it('should call addItem and navigate when onAdd is executed', fakeAsync(() => {
    spyOn(router, 'navigate');

    component.onAdd();
    tick();

    expect(apiService.addItem).toHaveBeenCalledWith(component.currentData);
    expect(router.navigate).toHaveBeenCalledWith(['/businessunits']);
  }));

  it('should call updateItem and navigate when onSubmit is executed', fakeAsync(() => {
    spyOn(router, 'navigate');
    component['paramId'] = 5;
    component.currentData = {
      id: 5,
      name: 'Updated BU',
      description: 'Updated',
      remarks: '',
      code: 'B05',
      sortOrder: 2
    };

    component.onSubmit();
    tick();

    expect(apiService.updateItem).toHaveBeenCalledWith(5, component.currentData);
    expect(router.navigate).toHaveBeenCalledWith(['/businessunits']);
  }));

  it('should navigate away when onCancel is invoked', () => {
    spyOn(router, 'navigate');

    component.onCancel();

    expect(router.navigate).toHaveBeenCalledWith(['/businessunits']);
  });
});
