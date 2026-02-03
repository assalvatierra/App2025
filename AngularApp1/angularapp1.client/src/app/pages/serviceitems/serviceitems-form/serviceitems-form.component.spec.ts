import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

import { ServiceItemsFormComponent } from './serviceitems-form.component';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  template: ''
})
class EntityFormStubComponent {
  @Input() modelData: any;
  dataForm = {
    value: {
      name: 'stub',
      description: 'desc',
      remarks: 'remarks',
      code: 'CODE',
      sortOrder: 1
    }
  };
}

describe('ServiceItemsFormComponent', () => {
  let component: ServiceItemsFormComponent;
  let fixture: ComponentFixture<ServiceItemsFormComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;
  let currentParam = '0';

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: () => currentParam
      }
    }
  } as unknown as ActivatedRoute;

  beforeEach(async () => {
    currentParam = '0';
    apiService = jasmine.createSpyObj('ApiService', ['getServiceItem', 'addServiceItem', 'updateServiceItem']);
    apiService.getServiceItem.and.returnValue(of({
      id: 1,
      name: 'Service',
      description: '',
      remarks: '',
      code: 'SVC',
      sortOrder: 1
    }));
    apiService.addServiceItem.and.returnValue(of({}));
    apiService.updateServiceItem.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [ServiceItemsFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        EntityFormStubComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceItemsFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    component.TitleInfo = 'Add New Service Items Form';
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

  it('should create and set defaults', () => {
    expect(component).toBeTruthy();
    expect(component.TitleInfo).toContain('Add New');
    expect(component.ShowAddBtn).toBeTrue();
  });

  it('should call addServiceItem and navigate when onAdd is invoked', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.onAdd();
    tick();
    expect(apiService.addServiceItem).toHaveBeenCalledWith(component.currentData);
    expect(router.navigate).toHaveBeenCalledWith(['/references/serviceitems']);
  }));

  it('should call updateServiceItem and navigate when onSubmit is invoked', fakeAsync(() => {
    currentParam = '5';
    component['paramId'] = 5;
    component.currentData = { ...component.currentData, id: 5 };
    component.ShowAddBtn = false;
    component.TitleInfo = 'Edit Service Items Form';

    spyOn(router, 'navigate');
    component.onSubmit();
    tick();
    expect(apiService.updateServiceItem).toHaveBeenCalledWith(5, component.currentData);
  }));

  it('should navigate away when onCancel is called', () => {
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/references/serviceitems']);
  });
});
