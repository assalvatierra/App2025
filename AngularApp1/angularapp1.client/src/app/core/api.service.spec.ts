import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { AppModule } from '../app.module';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ApiService],
      imports: [
        HttpClientTestingModule, AppModule,
      ],
    })
      .compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
