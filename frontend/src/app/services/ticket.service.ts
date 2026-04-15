import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalTickets: number;
  pendingTickets: number;
  resolvedTickets: number;
  averageResponseTime?: string; 
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private api = 'http://localhost:8081/api/tickets';

  constructor(private http: HttpClient) {}

  createTicket(request: any): Observable<any> {
    return this.http.post(`${this.api}/create-ticket`, request);
  }

  getMyTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/user`);
  }

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}`);
  }

  updateStatus( id: number, data: { status: string, solution: string, resolutionType: string }): Observable<any> {   
    return this.http.patch(`${this.api}/${id}/status`, {}, { params: { status } });
  }

  getAdminDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/stats/admin`);
  }

  getUserDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/stats/my-stats`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }
}