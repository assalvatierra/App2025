import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface JobCustomerDto {
  // JobCustomer Properties
  id: number;
  jobMainId?: number;
  customerId?: number;
  isPrimary: boolean;
  isBillTo: boolean;
  notes?: string;

  // Entity Properties (Customer)
  customerName?: string;
  customerDescription?: string;
  customerRemarks?: string;
  customerCode?: string;
  customerSortOrder?: number;
  customerContactNo1?: string;
  customerContactNo2?: string;
  customerAddress1?: string;
  customerAddress2?: string;
  customerEmail1?: string;
  customerEmail2?: string;
  customerCreatedBy?: string;
  customerCreatedOn: Date;
  customerLastEditBy?: string;
  customerLastEditOn: Date;
  customerIsArchived: boolean;
  customerIsPrivate: boolean;
  customerIsActive: boolean;
  customerEntityTypeId?: number;
  customerEntityStatusId?: number;
  customerBusinessUnitId?: number;
  customerRefCityId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiJobCustomersService {

  private url = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  // GET: api/JobCustomers - Get all job customers
  getJobCustomers(): Observable<JobCustomerDto[]> {
    return this.http.get<JobCustomerDto[]>(`${this.url}/api/JobCustomers`).pipe(
      map((res: any) => {
        return res.map((item: any) => this.mapToDto(item));
      })
    );
  }

  // GET: api/JobCustomers/5 - Get a specific job customer by ID
  getJobCustomer(id: number): Observable<JobCustomerDto> {
    return this.http.get<JobCustomerDto>(`${this.url}/api/JobCustomers/${id}`).pipe(
      map((item: any) => this.mapToDto(item))
    );
  }

  // GET: api/JobCustomers/ByJobMain/5 - Get all customers for a specific job
  getJobCustomersByJobMain(jobMainId: number): Observable<JobCustomerDto[]> {
    return this.http.get<JobCustomerDto[]>(`${this.url}/api/JobCustomers/ByJobMain/${jobMainId}`).pipe(
      map((res: any) => {
        return res.map((item: any) => this.mapToDto(item));
      })
    );
  }

  // POST: api/JobCustomers - Create a new job customer
  addJobCustomer(data: any): Observable<JobCustomerDto> {
    const payload = {
      jobMainId: data.jobMainId,
      customerId: data.customerId,
      isPrimary: data.isPrimary,
      isBillTo: data.isBillTo,
      notes: data.notes
    };
    return this.http.post<JobCustomerDto>(`${this.url}/api/JobCustomers`, payload).pipe(
      map((item: any) => this.mapToDto(item))
    );
  }

  // PUT: api/JobCustomers/5 - Update an existing job customer
  updateJobCustomer(id: number, data: any): Observable<any> {
    const payload = {
      id: data.id,
      jobMainId: data.jobMainId,
      customerId: data.customerId,
      isPrimary: data.isPrimary,
      isBillTo: data.isBillTo,
      notes: data.notes
    };
    return this.http.put<any>(`${this.url}/api/JobCustomers/${id}`, payload);
  }

  // DELETE: api/JobCustomers/5 - Delete a job customer
  deleteJobCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/JobCustomers/${id}`);
  }

  // Helper method to map API response to DTO
  private mapToDto(item: any): JobCustomerDto {
    return {
      // JobCustomer Properties
      id: item.id,
      jobMainId: item.jobMainId,
      customerId: item.customerId,
      isPrimary: item.isPrimary,
      isBillTo: item.isBillTo,
      notes: item.notes,

      // Entity (Customer) Properties
      customerName: item.customerName,
      customerDescription: item.customerDescription,
      customerRemarks: item.customerRemarks,
      customerCode: item.customerCode,
      customerSortOrder: item.customerSortOrder,
      customerContactNo1: item.customerContactNo1,
      customerContactNo2: item.customerContactNo2,
      customerAddress1: item.customerAddress1,
      customerAddress2: item.customerAddress2,
      customerEmail1: item.customerEmail1,
      customerEmail2: item.customerEmail2,
      customerCreatedBy: item.customerCreatedBy,
      customerCreatedOn: item.customerCreatedOn,
      customerLastEditBy: item.customerLastEditBy,
      customerLastEditOn: item.customerLastEditOn,
      customerIsArchived: item.customerIsArchived,
      customerIsPrivate: item.customerIsPrivate,
      customerIsActive: item.customerIsActive,
      customerEntityTypeId: item.customerEntityTypeId,
      customerEntityStatusId: item.customerEntityStatusId,
      customerBusinessUnitId: item.customerBusinessUnitId,
      customerRefCityId: item.customerRefCityId
    };
  }
}
