import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiAgentchatService {

  private baseUrl = environment.apiConfig.uri;

  constructor(private http: HttpClient) { }

  ProcessMessage(chatInfo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/AgentChat`, chatInfo);
  }

}
