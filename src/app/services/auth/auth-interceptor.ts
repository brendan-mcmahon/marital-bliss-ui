import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      const cloned = req.clone({
          headers: req.headers.set('Authorization',
              'Bearer ' + idToken)
      });

      return next.handle(cloned).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          console.log('user has been logged out, reauthenticate');
          this.authService.isLoggedIn$.next(false);
          this.authService.loggedInUser$.next(null);
          this.router.navigate(['']);
        }
      }));
    } else {
      return next.handle(req);
    }
  }
}
