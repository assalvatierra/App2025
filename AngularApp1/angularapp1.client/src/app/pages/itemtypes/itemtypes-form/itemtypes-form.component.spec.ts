import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';

import { ItemTypesFormComponent } from './itemtypes-form.component';
import { ApiService } from '../../../core/api.service';
import { ApiItemTypeClassService, ItemTypeClass } from '../../../core/services/api-item-type-class.service';

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

describe('ItemTypesFormComponent', () => {
  let component: ItemTypesFormComponent;
  let fixture: ComponentFixture<ItemTypesFormComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let classService: jasmine.SpyObj<ApiItemTypeClassService>;
  let router: Router;
  let currentParam = '0';

  const classList: ItemTypeClass[] = [
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
    apiService = jasmine.createSpyObj('ApiService', ['getItemType', 'addItemType', 'updateItemType']);
    apiService.getItemType.and.returnValue(of({
      id: 1,
      name: 'Type',
      description: 'desc',
      remarks: '',
      code: 'CODE',
      sortOrder: 1,
      itemTypeClassId: 1
    }));
    apiService.addItemType.and.returnValue(of({}));
    apiService.updateItemType.and.returnValue(of({}));

    classService = jasmine.createSpyObj('ApiItemTypeClassService', ['getItemTypeClasses']);
    classService.getItemTypeClasses.and.returnValue(of(classList));

    await TestBed.configureTestingModule({
      declarations: [ItemTypesFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        EntityFormStubComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: ApiItemTypeClassService, useValue: classService },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemTypesFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    component.TitleInfo = 'Add New Item Type Form';
    component.dataloading = false;
    component.ShowAddBtn = true;
    component.currentData = {
      id: 0,
      name: '',
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0,
      itemTypeClassId: null
    };
    component['paramId'] = 0;

    fixture.detectChanges();
  });

  it('should load classes on init', () => {
    expect(component).toBeTruthy();
    expect(classService.getItemTypeClasses).toHaveBeenCalled();
    expect(component.itemTypeClasses).toEqual(classList);
  });

  it('should call addItemType and navigate on add', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.onAdd();
    tick();
    expect(apiService.addItemType).toHaveBeenCalledWith(component.currentData);
    expect(router.navigate).toHaveBeenCalledWith(['/references/itemtypes']);
  }));

  it('should call updateItemType on submit with existing id', fakeAsync(() => {
    currentParam = '5';
    component['paramId'] = 5;
    component.currentData = { ...component.currentData, id: 5 };
    component.ShowAddBtn = false;
    component.TitleInfo = 'Edit Item Type Form';

    spyOn(router, 'navigate');
    component.onSubmit();
    tick();
    expect(apiService.updateItemType).toHaveBeenCalledWith(5, component.currentData);
  }));

  it('should navigate away when cancel is called', () => {
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/references/itemtypes']);
  });
});
