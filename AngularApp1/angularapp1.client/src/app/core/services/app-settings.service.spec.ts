import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppSettingsService, AppSetting } from './app-settings.service';

describe('AppSettingsService', () => {
  let service: AppSettingsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AppSettingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load settings from API', () => {
    const mockSettings: AppSetting[] = [
      { id: 1, sysKey: 'SHOW_JOBORDERS', sysValue: 'true' },
      { id: 2, sysKey: 'SHOW_MASTERFILES', sysValue: 'false' }
    ];

    service.loadSettings().subscribe(settings => {
      expect(settings.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:5157/api/AppSettings');
    expect(req.request.method).toBe('GET');
    req.flush(mockSettings);
  });

  it('should return null for unknown setting key', () => {
    expect(service.getSetting('UNKNOWN_KEY')).toBeNull();
  });

  it('should return setting value after loading', () => {
    const mockSettings: AppSetting[] = [
      { id: 1, sysKey: 'SHOW_JOBORDERS', sysValue: 'true' }
    ];

    service.loadSettings().subscribe();
    const req = httpMock.expectOne('http://localhost:5157/api/AppSettings');
    req.flush(mockSettings);

    expect(service.getSetting('SHOW_JOBORDERS')).toBe('true');
  });

  it('should return true for isMenuItemVisible when setting is "true"', () => {
    const mockSettings: AppSetting[] = [
      { id: 1, sysKey: 'SHOW_JOBORDERS', sysValue: 'true' }
    ];

    service.loadSettings().subscribe();
    const req = httpMock.expectOne('http://localhost:5157/api/AppSettings');
    req.flush(mockSettings);

    expect(service.isMenuItemVisible('SHOW_JOBORDERS')).toBeTrue();
  });

  it('should return false for isMenuItemVisible when setting is "false"', () => {
    const mockSettings: AppSetting[] = [
      { id: 1, sysKey: 'SHOW_MASTERFILES', sysValue: 'false' }
    ];

    service.loadSettings().subscribe();
    const req = httpMock.expectOne('http://localhost:5157/api/AppSettings');
    req.flush(mockSettings);

    expect(service.isMenuItemVisible('SHOW_MASTERFILES')).toBeFalse();
  });

  it('should return true for isMenuItemVisible when setting key is not configured', () => {
    expect(service.isMenuItemVisible('UNKNOWN_KEY')).toBeTrue();
  });

  it('should handle API errors gracefully and return empty settings', () => {
    service.loadSettings().subscribe(settings => {
      expect(settings).toEqual([]);
    });

    const req = httpMock.expectOne('http://localhost:5157/api/AppSettings');
    req.error(new ProgressEvent('error'));

    expect(service.getSetting('ANY_KEY')).toBeNull();
    expect(service.isMenuItemVisible('ANY_KEY')).toBeTrue();
  });
});
