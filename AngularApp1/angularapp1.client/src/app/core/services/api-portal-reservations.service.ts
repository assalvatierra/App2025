import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PortalReservationDto } from '../models/portal-reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPortalReservationsService {

  private baseUrl = environment.apiConfig.uri;

  constructor(private http: HttpClient) { }

  // Returns list of PortalReservationDto (List endpoint)
  getList(): Observable<PortalReservationDto[]> {
    return this.http.get<PortalReservationDto[]>(`${this.baseUrl}/api/PortalReservations/List`);
  }

  // Get single reservation DTO by id
  getById(id: number): Observable<PortalReservationDto> {
    return this.http.get<PortalReservationDto>(`${this.baseUrl}/api/PortalReservations/${id}`);
  }

  // Create new reservation
  add(reservation: PortalReservationDto): Observable<PortalReservationDto> {
    return this.http.post<PortalReservationDto>(`${this.baseUrl}/api/PortalReservations`, reservation);
  }

  // Update existing reservation
  update(id: number, reservation: PortalReservationDto): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/PortalReservations/${id}`, reservation);
  }

  // Delete reservation
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/PortalReservations/${id}`);
  }
}
