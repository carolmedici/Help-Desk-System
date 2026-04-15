
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.css'
})
export class TicketCreateComponent {
  ticketForm: FormGroup;

  constructor(private fb: FormBuilder, private service: TicketService, private router: Router) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.service.createTicket(this.ticketForm.value).subscribe(() => {
        this.router.navigate(['/tickets/list']);
      });
    }
  }
}
