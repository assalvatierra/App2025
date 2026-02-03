import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ServiceItemsComponent } from './serviceitems.component';
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

  initializeCalls: any[][] = [];

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

describe('ServiceItemsComponent', () => {
  let component: ServiceItemsComponent;
  let fixture: ComponentFixture<ServiceItemsComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;

  const serviceItems = [
    { id: 1, name: 'Service A', description: '', remarks: '', code: 'A', sortOrder: 1 },
    { id: 2, name: 'Service B', description: '', remarks: '', code: 'B', sortOrder: 2 }
  ];

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['getServiceItems']);
    apiService.getServiceItems.and.returnValue(of(serviceItems));

    await TestBed.configureTestingModule({
      declarations: [ServiceItemsComponent],
      imports: [RouterTestingModule, MatCardModule, EntityListTableStubComponent, UiPageTitleStubComponent],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: EntityService, useValue: jasmine.createSpyObj('EntityService', ['getDefaultEntityFields']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceItemsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and load data', () => {
    expect(component).toBeTruthy();
    expect(apiService.getServiceItems).toHaveBeenCalled();
    expect(component.dataloading).toBeFalse();
    const table = component.TableList as unknown as EntityListTableStubComponent;
    expect(table.initializeCalls[0]).toEqual(serviceItems);
  });

  it('should navigate to add form', () => {
    spyOn(router, 'navigate');
    component.onAddRecord();
    expect(router.navigate).toHaveBeenCalledWith(['/references/serviceitems/form', 0]);
  });

  it('should navigate to edit form with id', () => {
    spyOn(router, 'navigate');
    component.onEdit(7);
    expect(router.navigate).toHaveBeenCalledWith(['/references/serviceitems/form', 7]);
  });
});
