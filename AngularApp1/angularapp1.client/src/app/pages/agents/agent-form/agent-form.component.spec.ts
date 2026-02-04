import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { convertToParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { ApiAgentsService } from '../../../core/services/api-agents.service';
import { AgentFormComponent } from './agent-form.component';

@Component({
  selector: 'app-entity-form',
  template: '',
  standalone: true
})
class EntityFormStubComponent {}

describe('AgentFormComponent', () => {
  let component: AgentFormComponent;
  let fixture: ComponentFixture<AgentFormComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiAgentsService>;
  let router: Router;
  const activatedRouteStub = {
    snapshot: {
      paramMap: convertToParamMap({ id: '0' })
    }
  };

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj(ApiAgentsService.name, ['getAgent', 'updateAgent', 'addAgent']);
    apiServiceSpy.getAgent.and.returnValue(of({ id: 1, name: 'Agent', description: '', roles: '' }));
    apiServiceSpy.updateAgent.and.returnValue(of({}));
    apiServiceSpy.addAgent.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [AgentFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        EntityFormStubComponent
      ],
      providers: [
        { provide: ApiAgentsService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

  const createComponent = (paramId: string) => {
    activatedRouteStub.snapshot.paramMap = convertToParamMap({ id: paramId });
    fixture = TestBed.createComponent(AgentFormComponent);
    component = fixture.componentInstance;
    component['paramId'] = Number(paramId);
    component.TitleInfo = Number(paramId) === 0 ? 'Add New Agent Form' : 'Edit Agent Form';
    component.ShowAddBtn = Number(paramId) === 0;
    component.dataloading = false;
    fixture.detectChanges();
  };

  it('should create in add mode', () => {
    createComponent('0');
    expect(component).toBeTruthy();
    expect(component.ShowAddBtn).toBeTrue();
  });

  it('should navigate back to agents on cancel', () => {
    createComponent('0');
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/agents']);
  });
});
