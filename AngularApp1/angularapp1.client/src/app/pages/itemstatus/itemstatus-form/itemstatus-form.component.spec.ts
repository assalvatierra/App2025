import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';

import { ItemStatusFormComponent } from './itemstatus-form.component';
import { ApiService } from '../../../core/api.service';
import { ApiItemStatusClassService, ItemStatusClass } from '../../../core/services/api-item-status-class.service';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  template: ''
})
class EntityFormStubComponent {
  @Input() modelData: any;
  dataForm = {
    value: {
      name: 'Stub',
      description: 'desc',
      code: 'CODE',
      remarks: 'remarks',
      sortOrder: 0
    }
  };
}

describe('ItemStatusFormComponent', () => {
  let component: ItemStatusFormComponent;
  let fixture: ComponentFixture<ItemStatusFormComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let classService: jasmine.SpyObj<ApiItemStatusClassService>;
  let router: Router;
  let currentParam = '0';

  const classList: ItemStatusClass[] = [
    { id: 1, name: 'Class A' },
    { id: 2, name: 'Class B' }
  ];

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: () => currentParam
      }
    }
  } as unknown as ActivatedRoute;

  beforeEach(async () => {
    currentParam = '0';
    apiService = jasmine.createSpyObj('ApiService', ['getItemStatus', 'addItemStatus', 'updateItemStatus']);
    apiService.getItemStatus.and.returnValue(of({
      id: 1,
      name: 'Status',
      description: 'desc',
      remarks: '',
      code: 'CODE',
      sortOrder: 1,
      itemStatusClassId: 1
    }));
    apiService.addItemStatus.and.returnValue(of({}));
    apiService.updateItemStatus.and.returnValue(of({}));

    classService = jasmine.createSpyObj('ApiItemStatusClassService', ['getItemStatusClasses']);
    classService.getItemStatusClasses.and.returnValue(of(classList));

    await TestBed.configureTestingModule({
      declarations: [ItemStatusFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        EntityFormStubComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: ApiItemStatusClassService, useValue: classService },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemStatusFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    component.TitleInfo = 'Add New Item Status Form';
    component.dataloading = false;
    component.ShowAddBtn = true;
    component.currentData = {
      id: 0,
      name: '',
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0,
      itemStatusClassId: null
    };
    component['paramId'] = 0;

    fixture.detectChanges();
  });

  it('should create and load classes', () => {
    expect(component).toBeTruthy();
    expect(classService.getItemStatusClasses).toHaveBeenCalled();
    expect(component.itemStatusClasses).toEqual(classList);
  });

  it('should call addItemStatus when onAdd is executed', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.onAdd();
    tick();
    expect(apiService.addItemStatus).toHaveBeenCalledWith(component.currentData);
    expect(router.navigate).toHaveBeenCalledWith(['/references/itemstatus']);
  }));

  it('should call updateItemStatus when onSubmit is executed', fakeAsync(() => {
    spyOn(router, 'navigate');
    currentParam = '5';
    component['paramId'] = 5;
    component.currentData = { ...component.currentData, id: 5 };
    component.ShowAddBtn = false;
    component.TitleInfo = 'Edit Item Status Form';

    component.onSubmit();
    tick();

    expect(apiService.updateItemStatus).toHaveBeenCalledWith(5, component.currentData);
  }));

  it('should navigate away when onCancel is invoked', () => {
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/references/itemstatus']);
  });
});
