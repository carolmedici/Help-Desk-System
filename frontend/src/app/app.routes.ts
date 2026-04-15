import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


import { TicketListComponent } from './pages/tickets/ticket-list/ticket-list.component';
import { TicketCreateComponent } from './pages/tickets/ticket-create/ticket-create.component';
import { TicketDetailsComponent } from './pages/tickets/ticket-details/ticket-details.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },  
    { 
      path: 'tickets', 
   
      children: [
        { path: 'list', component: TicketListComponent },
        { path: 'create', component: TicketCreateComponent },
        { path: ':id', component: TicketDetailsComponent },
        { path: '', redirectTo: 'list', pathMatch: 'full' } 
      ]
    },
];