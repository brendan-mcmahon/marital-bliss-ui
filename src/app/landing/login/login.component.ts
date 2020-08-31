import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserLogin } from 'src/app/models/user-login';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatchService } from 'src/app/services/match.service';
import { Match } from 'src/app/models/match';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../landing.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() cancel = new EventEmitter<string>();
  @Output() forgotPassword = new EventEmitter<any>();
  errorMessage: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private matchService: MatchService,
    private authService: AuthService) { }

  model = new UserLogin();
  matches: Match[];

  login() {
    console.log('logging in');
    this.authService.login(this.model)
      .subscribe(result => {
        this.apiService.getUser().subscribe(user => {
          this.authService.loggedInUser$.next(user);
        });
        this.apiService.getAllMatches().subscribe(m => {
          const defaultMatch = this.getDefaultMatch(m);
          if (defaultMatch) { this.matchService.setMatch(defaultMatch); }
          this.router.navigate(['Game']);
        });
      },
        error => {
          console.log(`${JSON.stringify(error)}`);
          if (error.status === 401) {
            this.errorMessage = 'Your username or password were not correct. Please try again.';
          } else {
            this.errorMessage = 'Something went wrong... try again later.';
          }
        });
  }

getDefaultMatch(matches: Match[]) {
  let defaultMatch = matches.filter(m => m.currentGame && m.currentGame.status === 'in progress')[0];
  if (!defaultMatch) { defaultMatch = matches.filter(m => m.currentGame && m.currentGame.status === 'pending')[0]; }
  if (!defaultMatch) { defaultMatch = matches.filter(m => m.currentGame && m.currentGame.status === 'new')[0]; }
  if (!defaultMatch) { defaultMatch = matches.filter(m => m.currentGame && m.currentGame.status === 'finished')[0]; }
  if (!defaultMatch) { defaultMatch = matches[0]; }
  if (defaultMatch) { return defaultMatch; }
  return null;
}

emitCancel() {
  this.cancel.emit();
}

forgotPasswordTrigger() {
  this.forgotPassword.emit('registration');
}

ngOnInit() { }

}
