import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { MatchService } from './match.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'marital-bliss-ui';

  loggedIn = false;

  constructor(
    public matchService: MatchService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(i => this.loggedIn = i);
    this.apiService.getAllMatches().subscribe(m => {
      console.log('getting all matches...');
      // console.log(JSON.stringify(m));
      this.matchService.setMatches(m);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
