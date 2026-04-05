import { TestBed } from '@angular/core/testing';

import { ApiContactsService } from './api-contacts.service';

describe('ApiContactsService', () => {
  let service: ApiContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
