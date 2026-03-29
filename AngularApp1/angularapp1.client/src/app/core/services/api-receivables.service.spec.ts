import { TestBed } from '@angular/core/testing';

import { ApiReceivablesService } from './api-receivables.service';

describe('ApiReceivablesService', () => {
  let service: ApiReceivablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiReceivablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
