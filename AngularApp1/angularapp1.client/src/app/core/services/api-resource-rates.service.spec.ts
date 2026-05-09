import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiResourceRatesService } from './api-resource-rates.service';
import { ResourceRate } from '../models/resource-rate.model';

describe('ApiResourceRatesService', () => {
  let service: ApiResourceRatesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiResourceRatesService]
    });
    service = TestBed.inject(ApiResourceRatesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getResourceRates', () => {
    it('should return an Observable<ResourceRate[]>', () => {
      const mockResourceRates: ResourceRate[] = [
        {
          id: 1,
          resourceId: 1,
          createdBy: 'user1',
          createdOn: new Date('2024-01-01'),
          lastEditBy: 'user1',
          lastEditOn: new Date('2024-01-01'),
          isArchived: false,
          isPrivate: false,
          isActive: true,
          validFrom: new Date('2024-01-01'),
          validTo: new Date('2024-12-31'),
          daily: 100,
          monthly: 2000,
          hourly: 25,
          percent: 10,
          otRate: 30
        }
      ];

      service.getResourceRates().subscribe(resourceRates => {
        expect(resourceRates).toEqual(mockResourceRates);
      });

      const req = httpMock.expectOne('http://localhost:5157/api/ResourceRates');
      expect(req.request.method).toBe('GET');
      req.flush(mockResourceRates);
    });
  });

  describe('getResourceRate', () => {
    it('should return an Observable<ResourceRate>', () => {
      const mockResourceRate: ResourceRate = {
        id: 1,
        resourceId: 1,
        createdBy: 'user1',
        createdOn: new Date('2024-01-01'),
        lastEditBy: 'user1',
        lastEditOn: new Date('2024-01-01'),
        isArchived: false,
        isPrivate: false,
        isActive: true,
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2024-12-31'),
        daily: 100,
        monthly: 2000,
        hourly: 25,
        percent: 10,
        otRate: 30
      };

      service.getResourceRate(1).subscribe(resourceRate => {
        expect(resourceRate).toEqual(mockResourceRate);
      });

      const req = httpMock.expectOne('http://localhost:5157/api/ResourceRates/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockResourceRate);
    });
  });

  describe('addResourceRate', () => {
    it('should return an Observable<ResourceRate>', () => {
      const newResourceRate: ResourceRate = {
        id: 0,
        resourceId: 1,
        createdBy: 'user1',
        createdOn: new Date('2024-01-01'),
        lastEditBy: 'user1',
        lastEditOn: new Date('2024-01-01'),
        isArchived: false,
        isPrivate: false,
        isActive: true,
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2024-12-31'),
        daily: 100,
        monthly: 2000,
        hourly: 25,
        percent: 10,
        otRate: 30
      };

      service.addResourceRate(newResourceRate).subscribe(resourceRate => {
        expect(resourceRate).toEqual(newResourceRate);
      });

      const req = httpMock.expectOne('http://localhost:5157/api/ResourceRates');
      expect(req.request.method).toBe('POST');
      req.flush(newResourceRate);
    });
  });

  describe('updateResourceRate', () => {
    it('should return an Observable<any>', () => {
      const updatedResourceRate: ResourceRate = {
        id: 1,
        resourceId: 1,
        createdBy: 'user1',
        createdOn: new Date('2024-01-01'),
        lastEditBy: 'user1',
        lastEditOn: new Date('2024-01-01'),
        isArchived: false,
        isPrivate: false,
        isActive: true,
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2024-12-31'),
        daily: 150,
        monthly: 3000,
        hourly: 30,
        percent: 15,
        otRate: 35
      };

      service.updateResourceRate(1, updatedResourceRate).subscribe(response => {
        expect(response).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost:5157/api/ResourceRates/1');
      expect(req.request.method).toBe('PUT');
      req.flush({});
    });
  });

  describe('deleteResourceRate', () => {
    it('should return an Observable<any>', () => {
      service.deleteResourceRate(1).subscribe(response => {
        expect(response).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost:5157/api/ResourceRates/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});