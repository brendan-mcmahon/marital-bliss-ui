import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Match } from '../models/match';
import { MatchService } from '../services/match.service';
import { AuthService } from '../services/auth/auth.service';
import { Player } from '../models/player';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  @Output() gameSelected = new EventEmitter<any>();

  chevronRight = faChevronRight;
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
    console.log(`opening matches for ${this.matchService.player$.value}`);
    this.matchService.matches$.refreshAndSubscribe(m => this.matches = m);
  }

  goToGame(match: Match) {
    this.matchService.setMatch(match);
    this.gameSelected.emit();
    this.router.navigate([`Game`]);
  }

  addNewGame(matchId: number) {
  this.apiService.addGame(matchId)
    .subscribe(g => {
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
    console.log('getting all users');
    this.apiService.getAllUsers()
      .subscribe(u => {
        // console.log(JSON.stringify(u));
        this.showUserSearch = true;
        this.allUsers = u;
    });
  }

  search() {
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
