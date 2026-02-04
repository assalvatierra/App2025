import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiAgentsService } from './api-agents.service';

describe('ApiAgentsService', () => {
  let service: ApiAgentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiAgentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
