import { TestBed } from '@angular/core/testing';

import { ApiAgentchatService } from './api-agentchat.service';

describe('ApiAgentchatService', () => {
  let service: ApiAgentchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAgentchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
