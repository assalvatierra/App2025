import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ApiAgentsService } from '../../core/services/api-agents.service';
import { tableField } from '../../shared/models/entityListTableField';
import { AgentsComponent } from './agents.component';

@Component({
  selector: 'app-entity-list-table',
  template: '',
  standalone: true
})
class EntityListTableStubComponent {
  @Input() showEdit = true;
  @Input() editTitle = '';
  @Input() tableFields: tableField[] = [];
  @Output() addRecordClicked = new EventEmitter<void>();
  @Output() editRecordClicked = new EventEmitter<any>();
  initialize: jasmine.Spy<(param: any[]) => void> = jasmine.createSpy('initialize');
}

describe('AgentsComponent', () => {
  let component: AgentsComponent;
  let fixture: ComponentFixture<AgentsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiAgentsService>;
  let router: Router;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj(ApiAgentsService.name, ['getAgents']);
    apiServiceSpy.getAgents.and.returnValue(of([{ id: 1, name: 'Agent' }]));

    await TestBed.configureTestingModule({
      declarations: [AgentsComponent],
      imports: [RouterTestingModule, EntityListTableStubComponent],
      providers: [
        { provide: ApiAgentsService, useValue: apiServiceSpy }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load agents', () => {
    expect(component).toBeTruthy();
    expect(apiServiceSpy.getAgents).toHaveBeenCalled();
    const tableList = component.TableList as unknown as EntityListTableStubComponent;
    expect(tableList.initialize).toHaveBeenCalled();
  });

  it('should navigate to add form', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onAddRecord();
    expect(navigateSpy).toHaveBeenCalledWith(['/agents/add/form', 0]);
  });
});
