import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiBusinessUnitService } from './api-business-unit.service';

describe('ApiBusinessUnitService', () => {
  let service: ApiBusinessUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiBusinessUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
