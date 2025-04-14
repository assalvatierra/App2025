import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiEntityService {

  private url = 'http://localhost:5157';


  constructor(private http: HttpClient) { }

  getEntities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/Entities`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id : item.id,
          name : item.name,
          description : item.description,
          remarks : item.remarks,
          code : item.code,
          sortOrder : item.sortOrder,
          contactNo1 : item.contactNo1,
          contactNo2 : item.contactNo2,
          address1 : item.address1,
          address2 : item.address2,
          email1 : item.email1,
          email2 : item.email2,
          createdBy : item.createdBy,
          createdOn : item.createdOn,
          lastEditBy : item.lastEditBy,
          lastEditOn : item.lastEditOn,
          isArchived : item.isArchived,
          isPrivate : item.isPrivate,
          isActive : item.isActive,
          entityTypeId : item.entityTypeId,
          entityStatusId : item.entityStatusId,
          businessUnitId : item.businessUnitId,
          refCityId : item.refCityId,
          businessUnit : item.businessUnit,
          entityContacts : item.entityContacts,
          entityStatus : item.entityStatus,
          entityType : item.entityType,
          jobCustomers : item.jobCustomers,
          jobServices : item.jobServices,
          refCity : item.refCity 
        }));
      })
    );
  }


}


