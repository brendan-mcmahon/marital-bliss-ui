import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('id_token')) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
