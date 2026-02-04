import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';

import { AgentChatComponent } from './agent-chat.component';
import { ApiAgentchatService } from '../../core/services/api-agentchat.service';

describe('AgentChatComponent', () => {
  let component: AgentChatComponent;
  let fixture: ComponentFixture<AgentChatComponent>;

  beforeEach(waitForAsync(() => {
    const apiAgentchatSpy = jasmine.createSpyObj(ApiAgentchatService.name, ['ProcessMessage']);
    apiAgentchatSpy.ProcessMessage.and.returnValue(of({ messageReply: 'OK' }));

    TestBed.configureTestingModule({
      declarations: [AgentChatComponent],
      imports: [
  FormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule
      ],
      providers: [
        { provide: ApiAgentchatService, useValue: apiAgentchatSpy }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
