import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from './user-registration';
import { Observable } from 'rxjs';
import { UserLogin } from './user-login';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:3001/account';

  constructor(private http: HttpClient) { }

  register(user: UserRegistration): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/register`, user);
  }

  login(user: UserLogin ): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.baseUrl}/login`, user)
      .pipe(tap(token => {
        this.setSession(token);
      }));
        // .shareReplay();
  }

  private setSession(token: JwtToken) {
    // const expiresAt = moment().add(token.expiresIn, 'second');

    localStorage.setItem('id_token', token.token);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('currentMatch');
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
