import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/RefCountries`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,

          description: item.description,
          remarks: item.remarks,
          code: item.code,
          sortOrder: item.sortOrder
          
        }));
      })
    );
  }

  getCountry(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/RefCountries/${id}`);
  }
  addCountry(country: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/RefCountries`, country);
  }
  updateCountry(id: number, country: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/RefCountries/${id}`, country);
  }
  deleteCountry(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/RefCountries/${id}`);
  }

  
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/RefCities`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,

          description: item.description,
          remarks: item.remarks,
          code: item.code,
          sortOrder: item.sortOrder
          
        }));
      })
    );
  }

  getCity(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Api/RefCities/${id}`);
  }

  updateCity(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Api/RefCities/${id}`, data);
  }



  // CONTACTS API

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Contacts`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,
          remarks: item.remarks,
          contactNo1: item.contactNo1,
          contactNo2: item.contactNo2,
          address1: item.address1,
          address2: item.address2,
          email1: item.email1,
          email2: item.email2,
          createdBy: item.createdBy,
          createdOn: item.createdOn,
          lastEditBy: item.lastEditBy,
          lastEditOn: item.lastEditOn,
          isArchived: item.isArchived,
          isPrivate: item.isPrivate,
          isActive: item.isActive,
          typeId: item.typeId,
          statusId: item.statusId,
          refCityId: item.refCityId
        }));
      })
    );
  }

  getContact(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Contacts/${id}`);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Contacts`, contact);
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Contacts/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Contacts/${id}`);
  }

  // ITEM TYPES API

  getItemTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/ItemTypes`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          remarks: item.remarks,
          code: item.code,
          sortOrder: item.sortOrder
        }));
      })
    );
  }

  getItemType(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/ItemTypes/${id}`);
  }

  addItemType(itemType: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/ItemTypes`, itemType);
  }

  updateItemType(id: number, itemType: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/ItemTypes/${id}`, itemType);
  }

  deleteItemType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/ItemTypes/${id}`);
  }

  // ITEM STATUS API

  getItemStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/ItemStatus`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          remarks: item.remarks,
          code: item.code,
          sortOrder: item.sortOrder
        }));
      })
    );
  }

  getItemStatus(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/ItemStatus/${id}`);
  }

  addItemStatus(itemStatus: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/ItemStatus`, itemStatus);
  }

  updateItemStatus(id: number, itemStatus: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/ItemStatus/${id}`, itemStatus);
  }

  deleteItemStatus(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/ItemStatus/${id}`);
  }

  // SERVICE ITEMS API

  getServiceItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/ServiceItems`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          remarks: item.remarks,
          code: item.code,
          sortOrder: item.sortOrder
        }));
      })
    );
  }

  getServiceItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/ServiceItems/${id}`);
  }

  addServiceItem(serviceItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/ServiceItems`, serviceItem);
  }

  updateServiceItem(id: number, serviceItem: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/ServiceItems/${id}`, serviceItem);
  }

  deleteServiceItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/ServiceItems/${id}`);
  }

  // JOB MAINS API

  getJobMains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/JobMains`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          jobDate: item.jobDate,
          description: item.description,
          createdBy: item.createdBy,
          createdOn: item.createdOn,
          lastEditBy: item.lastEditBy,
          lastEditOn: item.lastEditOn,
          isArchived: item.isArchived,
          isPrivate: item.isPrivate,
          isActive: item.isActive,
          itemStatusId: item.itemStatusId,
          businessUnitId: item.businessUnitId
        }));
      })
    );
  }

  getJobMain(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/JobMains/${id}`);
  }

  addJobMain(jobMain: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/JobMains`, jobMain);
  }

  updateJobMain(id: number, jobMain: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/JobMains/${id}`, jobMain);
  }

  deleteJobMain(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/JobMains/${id}`);
  }

}
