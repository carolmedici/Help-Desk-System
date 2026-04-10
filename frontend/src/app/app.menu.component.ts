import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitemComponent } from './app.menuitem.component';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule, AppMenuitemComponent],
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.model = [
            {
                
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                        roles: ['ADMIN', 'USER'],
                    },
                ],
            },
            {
                label: 'Ticket',
                icon: 'pi pi-th-large',
                items: [               
                    {
                        label: 'Create Ticket',
                        icon: 'pi pi-plus-circle',
                        routerLink: ['/create-ticket'],
                        roles: ['USER'],
                    },
                    {
                        label: 'My Tickets',
                        icon: 'pi pi-ticket',
                        routerLink: ['/my-tickets'],
                        roles: ['USER'],
                    },
                    {
                        label: 'Tickets Opened',
                        icon: 'pi pi-ticket',
                        routerLink: ['/all-tickets'],
                        roles: ['ADMIN'],
                    },
                    {
                        label: 'Tickets Status',
                        icon: 'pi pi-sync',
                        routerLink: ['/status'],
                        roles: ['ADMIN'],
                    }  
                ],
            }
        ];  
        this.filterMenu();
    }    

    filterMenu() {
        this.model = this.model.map(category => {          
          const filteredItems = category.items.filter((item: any) => {          
            if (!item.roles || item.roles.length === 0) {
              return true; 
            }          
            return this.authService.hasRole(item.roles);
          });          
         
          return { ...category, items: filteredItems };
        }).filter(category => category.items.length > 0); 
      }
      
}