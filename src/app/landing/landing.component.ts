import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  showLogin = true;
  showRegistration = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private matchService: MatchService,
    private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.apiService.getAllMatches().subscribe(m => {
        this.matchService.setMatch(m[0]);
        console.log('logging in automatically.');
        this.router.navigate(['Game']);
      });
      } else {
        console.log('user must sign in to obtain token');
      }
  }

  toggleAction() {
    this.showLogin = !this.showLogin;
    this.showRegistration = !this.showRegistration;
  }
}
