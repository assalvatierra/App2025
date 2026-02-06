import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ContactsFormComponent } from './contacts-form.component';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-contact-info-form',
  standalone: true,
  template: ''
})
class ContactInfoFormStubComponent {
  @Input() modelData: any;
  dataForm = {
    get: (_key: string) => ({ value: `${_key}-value` })
  };
}

describe('ContactsFormComponent', () => {
  let component: ContactsFormComponent;
  let fixture: ComponentFixture<ContactsFormComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;
  let currentParam = '0';

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: () => currentParam
      }
    }
  };

  beforeEach(async () => {
    currentParam = '0';
    apiService = jasmine.createSpyObj('ApiService', ['getContact', 'addContact', 'updateContact', 'getItemStatuses', 'getItemTypes']);
    apiService.getContact.and.returnValue(of({
      Id: 1,
      Name: 'John Doe',
      StatusId: 2,
      ItemTypeId: 3
    }));
    apiService.addContact.and.returnValue(of({}));
    apiService.updateContact.and.returnValue(of({}));
    apiService.getItemStatuses.and.returnValue(of([
      { id: 1, name: 'Active' },
      { id: 2, name: 'Inactive' }
    ]));
    apiService.getItemTypes.and.returnValue(of([
      { id: 3, name: 'Customer' },
      { id: 4, name: 'Vendor' }
    ]));

    await TestBed.configureTestingModule({
      declarations: [ContactsFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        ContactInfoFormStubComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    const defaultData = {
      Id: 0,
      Name: '',
      ContactNo1: '',
      ContactNo2: '',
      Email1: '',
      Email2: '',
      Address1: '',
      Address2: '',
      StatusId: 1,
      ItemTypeId: 3
    };

    component.TitleInfo = 'Add New Contact Form';
    component.dataloading = false;
    component.ShowAddBtn = true;
    component.currentData = { ...defaultData };
    component['paramId'] = 0;

    fixture.detectChanges();

    const stub = fixture.debugElement.query(By.directive(ContactInfoFormStubComponent))?.componentInstance;
    if (stub) {
      component.contactInfo = stub;
    }
  });

  it('should create component in add state', () => {
    expect(component).toBeTruthy();
    expect(component.TitleInfo).toContain('Add New');
    expect(component.ShowAddBtn).toBeTrue();
  });

  it('should call addContact when onAdd is triggered', fakeAsync(() => {
    component.dataFormName.get('name')?.setValue('Test Name');

    component.onAdd();
    tick();

    expect(apiService.addContact).toHaveBeenCalled();
  }));

  it('should call updateContact and navigate when onSubmit is triggered for an existing id', fakeAsync(() => {
    currentParam = '5';
    component['paramId'] = 5;
    component.currentData = { ...component.currentData, Id: 5 };
    component.TitleInfo = 'Edit Contact Form';
    component.ShowAddBtn = false;

    spyOn(router, 'navigate');
    component.dataFormName.get('name')?.setValue('Updated Name');

    component.onSubmit();
    tick();

    expect(apiService.updateContact).toHaveBeenCalledWith(5, component.currentData);
    expect(router.navigate).toHaveBeenCalledWith(['/contacts']);
  }));

  it('should navigate away when onCancel is invoked', () => {
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/contacts']);
  });

  it('should load item statuses for dropdown options', fakeAsync(() => {
    component['getApiItemStatusLookupData']();
    tick();

    expect(apiService.getItemStatuses).toHaveBeenCalled();
    expect(component.itemStatusLookupData.length).toBe(2);
  }));

  it('should load item types for dropdown options', fakeAsync(() => {
    component['getApiItemTypeLookupData']();
    tick();

    expect(apiService.getItemTypes).toHaveBeenCalled();
    expect(component.itemTypeLookupData.length).toBe(2);
  }));
});
