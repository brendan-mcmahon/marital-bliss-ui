import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { MatchService } from './services/match.service';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { GesturesService } from './services/gestures.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'marital-bliss-ui';

  loggedIn = false;
  hasMatch = false;
  activeRoute: string;
  navigationOrder = ['Game', 'Guess', 'Rewards', 'Deck'];

  constructor(
    public matchService: MatchService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private gesturesService: GesturesService) {
      this.router.events.subscribe(e => {
        this.activeRoute = this.router.url.substring(1);
      });
     }

  ngOnInit(): void {
    console.log(this.loggedIn);
    this.matchService.match$.refreshAndSubscribe(m => this.hasMatch = m !== null);
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.apiService.getAllMatches().subscribe(m => {
          this.matchService.setMatches(m);
        });
      }
    });
  }

  onSwipeDown(event: any) {
    console.log('swiped!');
    this.gesturesService.refreshPage();
  }

  onSwipeLeft(event: any) {
    console.log('swiped left!');
    const index = this.navigationOrder.indexOf(this.activeRoute);
    console.log(index);
    console.log(this.activeRoute);
    if (this.navigationOrder.length) {
      this.router.navigate([this.navigationOrder[index + 1]]);
    }
  }

  onSwipeRight(event: any) {
    console.log('swiped right!');
    const index = this.navigationOrder.indexOf(this.activeRoute);
    console.log(index);
    console.log(this.activeRoute);
    if (index !== 0) {
      this.router.navigate([this.navigationOrder[index - 1]]);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
