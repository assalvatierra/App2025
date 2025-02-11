import { TestBed } from '@angular/core/testing';

import { SampleDataServiceService } from './sample-data-service.service';

describe('SampleDataServiceService', () => {
  let service: SampleDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
