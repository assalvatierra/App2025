import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAgentchatService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  ProcessMessage(chatInfo: any): Observable<any> {

    chatInfo = {
      AgentId: 0,
      Instructions: 'test1',
      messageRequest: 'test1',
      messageReply: ''
    };

    return this.http.post<any>(`${this.baseUrl}/api/AgentChat`, chatInfo);
  }

}
