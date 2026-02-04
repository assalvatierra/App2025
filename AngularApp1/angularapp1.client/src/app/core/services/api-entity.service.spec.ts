import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiEntityService } from './api-entity.service';

describe('ApiEntityService', () => {
  let service: ApiEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
