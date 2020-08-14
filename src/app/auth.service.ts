import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from './user-registration';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UserLogin } from './user-login';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { Player } from './models/player';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:3001/account';
  loggedInUser$ = new BehaviorSubject<Player>(null);
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private apiService: ApiService) {
    console.log('constructing auth service');
    this.isLoggedIn$.next(this.isLoggedIn());
  }

  register(user: UserRegistration): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.baseUrl}/register`, user)
      .pipe(tap(token => {
        this.setSession(token);
        this.isLoggedIn$.next(true);
      }));
  }

  login(user: UserLogin): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.baseUrl}/login`, user)
      .pipe(tap(token => {
        this.setSession(token);
        this.isLoggedIn$.next(true);
      }));
    // .shareReplay();
  }

  getLoggedInUser() {
    if (this.loggedInUser$.value !== null) {
      return this.loggedInUser$.value;
    } else {
      this.apiService.getUser().subscribe(u => {
        this.loggedInUser$.next(u);
        this.isLoggedIn$.next(true);
      });
    }
  }

  private setSession(token: JwtToken) {
    // const expiresAt = moment().add(token.expiresIn, 'second');

    localStorage.setItem('id_token', token.token);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('currentMatch');
    this.isLoggedIn$.next(false);
    this.loggedInUser$.next(null);
    // localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('id_token') !== null;
    // return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

export class JwtToken {
  expiresIn: moment.DurationInputArg1;
  token: string;
}
