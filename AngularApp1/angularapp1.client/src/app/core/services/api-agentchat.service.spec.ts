import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiAgentchatService } from './api-agentchat.service';

describe('ApiAgentchatService', () => {
  let service: ApiAgentchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiAgentchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
