import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiSysFeaturesService, SysFeature } from './api-sys-features.service';

describe('ApiSysFeaturesService', () => {
  let service: ApiSysFeaturesService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:5157';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiSysFeaturesService]
    });
    service = TestBed.inject(ApiSysFeaturesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all system features', () => {
    const mockFeatures: SysFeature[] = [
      {
        id: 1,
        name: 'Feature 1',
        description: 'Test Feature',
        isEnabled: true,
        expiry: new Date('2025-12-31'),
        sysCode: 'FEAT_001',
        settings: '{}'
      }
    ];

    service.getSysFeatures().subscribe(features => {
      expect(features.length).toBe(1);
      expect(features[0].name).toBe('Feature 1');
    });

    const req = httpMock.expectOne(`${baseUrl}/api/SysFeatures`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFeatures);
  });

  it('should get system features with filters', () => {
    const mockFeatures: SysFeature[] = [];

    service.getSysFeatures('FEAT_001', 'Feature').subscribe();

    const req = httpMock.expectOne(request =>
      request.url === `${baseUrl}/api/SysFeatures` &&
      request.params.get('sysCode') === 'FEAT_001' &&
      request.params.get('name') === 'Feature'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockFeatures);
  });

  it('should get a single system feature by ID', () => {
    const mockFeature: SysFeature = {
      id: 1,
      name: 'Feature 1',
      description: 'Test Feature',
      isEnabled: true,
      expiry: new Date('2025-12-31'),
      sysCode: 'FEAT_001',
      settings: '{}'
    };

    service.getSysFeature(1).subscribe(feature => {
      expect(feature.name).toBe('Feature 1');
      expect(feature.id).toBe(1);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/SysFeatures/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFeature);
  });

  it('should get a system feature by system code', () => {
    const mockFeature: SysFeature = {
      id: 1,
      name: 'Feature 1',
      description: 'Test Feature',
      isEnabled: true,
      expiry: new Date('2025-12-31'),
      sysCode: 'FEAT_001',
      settings: '{}'
    };

    service.getSysFeatureBySysCode('FEAT_001').subscribe(feature => {
      expect(feature.sysCode).toBe('FEAT_001');
    });

    const req = httpMock.expectOne(`${baseUrl}/api/SysFeatures/BySysCode/FEAT_001`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFeature);
  });

  it('should get enabled system features', () => {
    const mockFeatures: SysFeature[] = [
      {
        id: 1,
        name: 'Feature 1',
        description: 'Test Feature',
        isEnabled: true,
        expiry: new Date('2025-12-31'),
        sysCode: 'FEAT_001',
        settings: '{}'
      }
    ];

    service.getEnabledSysFeatures().subscribe(features => {
      expect(features.length).toBe(1);
      expect(features[0].isEnabled).toBe(true);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/SysFeatures/Enabled`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFeatures);
  });

  it('should add a new system feature', () => {
    const newFeature: SysFeature = {
      id: 0,
      name: 'New Feature',
      description: 'Test',
      isEnabled: true,
      expiry: new Date('2025-12-31'),
      sysCode: 'FEAT_NEW',
      settings: '{}'
    };

    service.addSysFeature(newFeature).subscribe(feature => {
      expect(feature).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseUrl}/api/SysFeatures`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newFeature);
    req.flush(newFeature);
  });

  it('should update a system feature', () => {
    const updatedFeature: SysFeature = {
      id: 1,
      name: 'Updated Feature',
      description: 'Updated',
      isEnabled: false,
      expiry: new Date('2025-12-31'),
      sysCode: 'FEAT_001',
      settings: '{}'
    };

    service.updateSysFeature(1, updatedFeature).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/api/SysFeatures/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedFeature);
    req.flush({});
  });

  it('should delete a system feature', () => {
    service.deleteSysFeature(1).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/api/SysFeatures/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
