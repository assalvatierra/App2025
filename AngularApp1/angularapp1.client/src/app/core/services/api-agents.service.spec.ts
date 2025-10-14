import { TestBed } from '@angular/core/testing';

import { ApiAgentsService } from './api-agents.service';

describe('ApiAgentsService', () => {
  let service: ApiAgentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAgentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
