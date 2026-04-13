import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const keycloak = inject(KeycloakService);  
  const isLoggedIn = keycloak.isLoggedIn(); 

  if (!isLoggedIn) {
    return next(req);
  }

  return from(keycloak.updateToken(30)).pipe(
    switchMap(() => from(keycloak.getToken())),
    switchMap((token) => {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(cloned);
    })
  );
};