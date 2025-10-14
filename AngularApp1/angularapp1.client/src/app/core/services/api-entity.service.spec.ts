import { TestBed } from '@angular/core/testing';

import { ApiEntityService } from './api-entity.service';

describe('ApiEntityService', () => {
  let service: ApiEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
