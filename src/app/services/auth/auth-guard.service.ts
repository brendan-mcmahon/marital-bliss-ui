import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (!localStorage.getItem('id_token')) {
      this.authService.isLoggedIn$.next(false);
      this.authService.loggedInUser$.next(null);
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
