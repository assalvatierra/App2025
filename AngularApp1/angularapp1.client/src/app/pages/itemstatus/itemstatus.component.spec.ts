import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ItemStatusComponent } from './itemstatus.component';
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
  @Input() editTitle?: string;
  @Input() tableFields: any[] = [];
  @Output() addRecordClicked = new EventEmitter<void>();
  @Output() editRecordClicked = new EventEmitter<any>();
  @Output() onEditDetails = new EventEmitter<any>();
  @Output() onArchiveRecord = new EventEmitter<any>();

  public initializeCalls: any[][] = [];

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

describe('ItemStatusComponent', () => {
  let component: ItemStatusComponent;
  let fixture: ComponentFixture<ItemStatusComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;

  const statuses = [
    { id: 1, name: 'Active', description: 'Active status', remarks: '', code: 'ACT', sortOrder: 1, isActive: true, isArchived: false },
    { id: 2, name: 'Inactive', description: 'Inactive status', remarks: '', code: 'INA', sortOrder: 2, isActive: true, isArchived: false }
  ];

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['getItemStatuses']);
    apiService.getItemStatuses.and.returnValue(of(statuses));

    await TestBed.configureTestingModule({
      declarations: [ItemStatusComponent],
      imports: [RouterTestingModule, MatCardModule, EntityListTableStubComponent, UiPageTitleStubComponent],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: EntityService, useValue: jasmine.createSpyObj('EntityService', ['getDefaultEntityFields']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemStatusComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and initialize the list', () => {
    expect(component).toBeTruthy();
    expect(apiService.getItemStatuses).toHaveBeenCalled();
    expect(component.dataloading).toBeFalse();
    const table = component.TableList as unknown as EntityListTableStubComponent;
    expect(table.initializeCalls[0]).toEqual(statuses);
  });

  it('should navigate to add form', () => {
    spyOn(router, 'navigate');
    component.onAddRecord();
    expect(router.navigate).toHaveBeenCalledWith(['/references/itemstatus/form', 0]);
  });

  it('should navigate to edit form', () => {
    spyOn(router, 'navigate');
    component.onEdit(5);
    expect(router.navigate).toHaveBeenCalledWith(['/references/itemstatus/form', 5]);
  });
});
