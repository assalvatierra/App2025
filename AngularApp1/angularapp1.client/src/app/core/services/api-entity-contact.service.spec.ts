import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiEntityContactService } from './api-entity-contact.service';
import { EntityContact } from '../models/entity-contact.model';

describe('ApiEntityContactService', () => {
  let service: ApiEntityContactService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:5157';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiEntityContactService]
    });
    service = TestBed.inject(ApiEntityContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get entity contacts by contact ID', () => {
    const mockData: EntityContact[] = [
      { id: 1, contactId: 1, entityId: 1, notes: 'Test note' }
    ];
    const contactId = 1;

    service.getEntityContactsByContactId(contactId).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/EntityContacts/ByContact/${contactId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should add entity contact', () => {
    const newEntityContact: EntityContact = {
      contactId: 1,
      entityId: 2,
      notes: 'New relationship'
    };

    service.addEntityContact(newEntityContact).subscribe(data => {
      expect(data).toEqual(newEntityContact);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/EntityContacts`);
    expect(req.request.method).toBe('POST');
    req.flush(newEntityContact);
  });

  it('should delete entity contact', () => {
    const id = 1;

    service.deleteEntityContact(id).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/api/EntityContacts/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
