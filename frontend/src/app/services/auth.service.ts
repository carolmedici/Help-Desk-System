import Keycloak from 'keycloak-js';

export class AuthService {
  private keycloak!: any;

  async init(): Promise<boolean> {
    this.keycloak = new (Keycloak as any)({
      url: 'http://localhost:8080',
      realm: 'helpdesk-realm',
      clientId: 'frontend'
    });

    try {     
      const authenticated: boolean = await this.keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false
      });
      
      return authenticated;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  getUsername(): string | undefined {
    return this.keycloak.tokenParsed?.preferred_username;
  }

  getRoles(): string[] {
    return this.keycloak.tokenParsed?.realm_access?.roles || [];
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ADMIN');
  }

  isUser(): boolean{
    return this.getRoles().includes('USER')
  }
}