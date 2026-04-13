import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  
  constructor(
    private keycloakService: KeycloakService,
    private router: Router) {}
  
  getToken() {
    return this.keycloakService.getKeycloakInstance().token;
  }

  getUsername(): string {
    const instance = this.keycloakService.getKeycloakInstance();
    if (instance && instance.authenticated) {       
        return instance.tokenParsed?.['preferred_username'] || '';
    }
    return '';
  }

  getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  isAdmin(): boolean {  
    return this.getRoles().includes('ADMIN');
  }

  isUser(): boolean {
    return this.getRoles().includes('USER');    
  }

   hasRole(roles: string[]): boolean {
    const userRoles = this.keycloakService.getUserRoles();
    return roles.some(role => userRoles.includes(role));
  }

  logout() {
    this.keycloakService.logout(window.location.origin);
  }
}