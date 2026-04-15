import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent implements OnInit {
  ticket: any;
  statusToUpdate: string = 'OPEN';
  solutionText: string = '';
  resolutionType: string = 'FIXED';

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    public authService: AuthService
  ) {}

  ngOnInit() {   
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.ticketService.getById(+idParam).subscribe(t => {
        this.ticket = t;       
        this.statusToUpdate = t.status;
      });
    }
  }

  submitUpdate() {
    if (!this.ticket) return;

    const updateData = {
      status: this.statusToUpdate,
      solution: this.statusToUpdate === 'CLOSED' ? this.solutionText : '',
      resolutionType: this.statusToUpdate === 'CLOSED' ? this.resolutionType : ''
    };

    this.ticketService.updateStatus(this.ticket.id, updateData).subscribe({
      next: (updated) => {
        this.ticket = updated;
        alert('Ticket updated successfully!');
      },
      error: (err) => {
        console.error('Error updating ticket', err);
        alert('Update failed. Check console for details.');
      }
    });
  }
}