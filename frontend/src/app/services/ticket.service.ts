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

  getMyTickets() {
   return this.http.get(`${this.api}/user`);
  }

  getAllTickets() {
    return this.http.get(`${this.api}`);
  }

  updateStatus(id: number, status: string) {
    return this.http.patch(`${this.api}/${id}/status?status=${status}`, {});
  }

  getAdminDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/stats/admin`);
  }

  getUserDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/stats/my-stats`) 
  }
    
}