import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DashboardStats, TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule]
})

export class DashboardComponent implements OnInit {
  
  stats: DashboardStats = {
    totalTickets: 0,
    pendingTickets: 0,
    resolvedTickets: 0
  };
  
  isLoading = true;
  userName: string = '';

  constructor(
    public authService: AuthService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUsername();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
  
    if (this.authService.hasRole(['ADMIN'])) {
      this.getAdminStats();
    } else {
      console.log('user')
      this.getUserStats();
    }
  }

  private getAdminStats(): void {    
    this.ticketService.getAdminDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error', err);
        this.isLoading = false;
      }
    });
  }

  private getUserStats(): void {  
    console.log('chamou')
    this.ticketService.getUserDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error', err);
        this.isLoading = false;
      }
    });
  }
}