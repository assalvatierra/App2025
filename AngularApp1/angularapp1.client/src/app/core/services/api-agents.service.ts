import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiAgentsService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }
  
  //Agents
  getAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Agents`).pipe(
      map((res: any) => {
        return res.map((agent: any) => ({
          id: agent.id,
          name: agent.name,
          description: agent.description,
          roles: agent.Roles
        }));
      })
    );
  }

  addAgent(agent: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Agents`, agent);
  }

  getAgent(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Api/Agents/${id}`);
  }
  updateAgent(id: number, country: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Agents/${id}`, country);
  }
  deleteAgent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Agents/${id}`);
  }


  //Agents Bins
  getAgentBins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/AgentBins`).pipe(
      map((res: any) => {
        return res.map((agentbin: any) => ({
          id: agentbin.id,
          agentId: agentbin.agentId,
          data: agentbin.data,
          dtAdded: agentbin.dtAdded
        }));
      })
    );
  }

  addAgentBin(agent: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/AgentBins`, agent);
  }

  getAgentBin(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Api/AgentBins/${id}`);
  }
  updateAgentBin(id: number, country: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/AgentBins/${id}`, country);
  }
  deleteAgentBin(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/AgentBins/${id}`);
  }


  
  //Agents Instructions
  getAgentInstructions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/AgentInstructions`).pipe(
      map((res: any) => {
        return res.map((agentIns: any) => ({
          id: agentIns.id,
          agentId: agentIns.name,
          title: agentIns.title,
          content: agentIns.content,
          keywords: agentIns.keywords
        }));
      })
    );
  }

  addAgentInstructions(agent: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/AgentInstructions`, agent);
  }

  getAgentInstruction(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Api/AgentInstructions/${id}`);
  }
  updateAgentInstruction(id: number, country: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/AgentInstructions/${id}`, country);
  }
  deleteAgentInstruction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/AgentInstructions/${id}`);
  }
}



