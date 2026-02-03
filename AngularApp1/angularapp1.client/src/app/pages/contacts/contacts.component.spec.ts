import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ContactsComponent } from './contacts.component';
import { ApiService } from '../../core/api.service';
import { EntityService } from '../../shared/entity.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-entity-list-table',
  standalone: true,
  template: ''
})
class EntityListTableStubComponent {
  @Input() showEdit = true;
  @Input() editTitle: string | undefined;
  @Input() tableFields: any[] = [];
  @Output() addRecordClicked = new EventEmitter<void>();
  @Output() editRecordClicked = new EventEmitter<any>();
  @Output() onEditDetails = new EventEmitter<any>();
  @Output() onArchiveRecord = new EventEmitter<any>();

  public initializeCalls: any[] = [];

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

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;

  const mockContacts = [
    { id: 1, name: 'Alice', contactNo1: '123', contactNo2: '456', email1: 'a@test.com', email2: 'a2@test.com', isActive: true, isArchived: false },
    { id: 2, name: 'Bob', contactNo1: '789', contactNo2: '012', email1: 'b@test.com', email2: 'b2@test.com', isActive: true, isArchived: false }
  ];

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['getContacts']);
    apiService.getContacts.and.returnValue(of(mockContacts));

    await TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      imports: [
        RouterTestingModule,
        MatCardModule,
        EntityListTableStubComponent,
        UiPageTitleStubComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: EntityService, useValue: jasmine.createSpyObj('EntityService', ['getDefaultEntityFields']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and retrieve contacts', () => {
    expect(component).toBeTruthy();
    expect(apiService.getContacts).toHaveBeenCalled();
    expect(component.dataloading).toBeFalse();
  const table = component.TableList as unknown as EntityListTableStubComponent;
    expect(table).toBeTruthy();
    expect(table.initializeCalls[0]).toEqual(mockContacts);
  });

  it('should navigate to the add form', () => {
    spyOn(router, 'navigate');
    component.onAddRecord();
    expect(router.navigate).toHaveBeenCalledWith(['/contacts/form', 0]);
  });

  it('should navigate to edit form with provided id', () => {
    spyOn(router, 'navigate');
    component.onEdit(5);
    expect(router.navigate).toHaveBeenCalledWith(['/contacts/form', 5]);
  });
});