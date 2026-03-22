import { TestBed } from '@angular/core/testing';

import { ApiTimesheetsService } from './api-timesheets.service';

describe('ApiTimesheetsService', () => {
  let service: ApiTimesheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTimesheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
