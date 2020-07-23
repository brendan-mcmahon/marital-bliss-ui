import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserLogin } from 'src/app/user-login';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatchService } from 'src/app/match.service';
import { Match } from 'src/app/models/match';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() cancel = new EventEmitter<any>();
  errorMessage: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private matchService: MatchService,
    private authService: AuthService) {}

  model = new UserLogin();
  matches: Match[];

  login() {
    console.log('logging in');
    this.authService.login(this.model)
    .subscribe(result => {
      this.apiService.getAllMatches().subscribe(m => {
        this.matchService.setMatch(m[0]);
        this.router.navigate(['Game']);
      });
    },
    error => {
      console.log(`${JSON.stringify(error)}`);
      if (error.status === 401) {
        this.errorMessage = 'Your username or password were not correct. Please try again.';
      }
    });
  }

  emitCancel() {
    this.cancel.emit();
  }

  ngOnInit() { }

}
