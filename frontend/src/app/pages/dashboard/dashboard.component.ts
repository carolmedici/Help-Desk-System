import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DashboardStats, TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, ChartModule]
})

export class DashboardComponent implements OnInit {
  
  stats: DashboardStats = {
    totalTickets: 0,
    pendingTickets: 0,
    resolvedTickets: 0
  };
  
  isLoading = true;
  userName: string = '';

  chartData : any;
  chartOptions: any;

  constructor(
    public authService: AuthService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUsername();
    this.loadDashboardData();
    this.initChartOptions();
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
        this.updateChart(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error', err);
        this.isLoading = false;
      }
    });
  }

  private getUserStats(): void {     
    this.ticketService.getUserDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.updateChart(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error', err);
        this.isLoading = false;
      }
    });
  }

  private initChartOptions(){
    this.chartOptions = {
      plugins: {
          legend: { position: 'bottom' },
          tooltip: {
              callbacks: {
                  label: (context: any) => {
                      let label = context.label || '';
                      let value = context.raw || 0;
                      let total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                      let percentage = Math.round((value / total) * 100);
                      return `${label}: ${value} (${percentage}%)`;
                  }
              }
          }
      },
      cutout: '70%'
    };
  }

  private updateChart(data: DashboardStats){
    this.chartData = {
      labels: ['Pending', 'Resolved'],
      datasets: [
        {
          data: [data.pendingTickets, data.resolvedTickets],
          backgroundColor: ['#FBBF24', '#10B981'],
          hoverBackgroundColor: ['#F59E0B', '#059669']
        }
      ]
    }
  }
}