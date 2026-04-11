import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TicketsComponent } from './pages/tickets/tickets.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'admin', component: AdminComponent},
    { path: 'tickets', component: TicketsComponent },
];
