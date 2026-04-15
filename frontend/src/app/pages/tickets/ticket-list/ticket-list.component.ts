import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  isAdmin = false;

  constructor(private ticketService: TicketService, public authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadTickets();
  }

  loadTickets() {
    const request = this.isAdmin 
      ? this.ticketService.getAllTickets()  
      : this.ticketService.getMyTickets(); 

    request.subscribe(data => this.tickets = data);
  }

}
