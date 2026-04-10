import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service'; 
import { CommonModule } from '@angular/common'; 
import { AppMenuComponent } from './app.menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    AppMenuComponent
  ], 
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
   isMenuOpen = false;
  
  constructor(public authService: AuthService) {}

  ngOnInit(): void { } 

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}