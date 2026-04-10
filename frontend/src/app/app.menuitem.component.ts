import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: '[app-menuitem]',
    standalone: true,
    host: {
        'class': 'block w-full' // Isso faz o componente ocupar 100% da largura
    },
    imports: [CommonModule, RouterModule],
    template: `
        <ng-container>
            <div *ngIf="root" class="layout-menuitem-root-text  pl-4" style="font-weight: bold; margin-top: 1rem;">
                {{ item.label }}
            </div>

            <a *ngIf="item.routerLink" [routerLink]="item.routerLink" routerLinkActive="active-route" class="flex items-center p-3 no-underline color-inherit transition-colors duration-200 hover:bg-teal-600 hover:text-white w-full block pl-4">                
                <i [ngClass]="item.icon" class="mr-3 text-lg"></i>
                <span class="font-medium">{{ item.label }}</span>
            </a>

            <ul *ngIf="item.items">
                <li app-menuitem 
                    *ngFor="let child of item.items; let i = index" 
                    [item]="child" 
                    [index]="i" 
                    [root]="false">
                </li>
            </ul>
        </ng-container>
    `
})
export class AppMenuitemComponent {
    @Input() item: any;
    @Input() index!: number;
    @Input() root: boolean = false;
}