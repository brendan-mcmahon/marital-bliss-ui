import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Match } from '../models/match';
import { MatchService } from '../match.service';
import { AuthService } from '../auth.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentGameRunning = true;
  matches: Match[];
  showUserSearch = false;
  searchTerms = '';
  allUsers: Player[];
  allUsersDisplay: Player[];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private matchService: MatchService,
    private authService: AuthService) {}

  ngOnInit() {
    this.apiService.getAllMatches().subscribe(m => {
      console.log(m);
      this.matches = m;
    });
  }

  goToGame(match: Match) {
    this.matchService.setMatch(match);
    this.router.navigate([`Game`]);
  }

  addNewGame(matchId: number) {
  this.apiService.addGame(matchId)
    .subscribe(g => {
      console.log(`Got this new game here: ${JSON.stringify(g)}`);
      this.matches.filter(m => m.id = matchId)[0].currentGame = g;
    });
  }

  getGame(gameId: number) {
    this.apiService.getMostRecentGame(gameId)
      .subscribe(g => {
        this.router.navigate(['Game', { id: gameId }]);
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  openSearch() {
    this.apiService.getAllUsers()
      .subscribe(u => {
        this.showUserSearch = true;
        this.allUsers = u;
    });
  }

  search() {
    console.log(this.searchTerms);
    if (this.searchTerms !== '') {
      this.allUsersDisplay = this.allUsers.filter(u => {
        return  u.firstName.match(new RegExp(this.searchTerms, 'i'))
          || u.lastName.match(new RegExp(this.searchTerms, 'i'))
          || u.email.match(new RegExp(this.searchTerms, 'i'));
      });
    } else {
      this.allUsersDisplay = [];
    }
  }

  startMatch(email: string) {
    this.apiService.addMatch(email)
      .subscribe(m => {
        this.goToGame(m);
      });
  }
}
