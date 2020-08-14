import { Injectable } from '@angular/core';
import { Match } from './models/match';
import { Game } from './models/game';
import { Router } from '@angular/router';
import { Player } from './models/player';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  public matches: Match[];
  public match: Match;
  public matchUpdate$ = new Subject<number>();

  constructor(private router: Router, private authService: AuthService) { }

  public getMatch(): Match {
    if (!this.match) {
      if (localStorage.getItem('currentMatch') && localStorage.getItem('currentMatch') !== 'undefined') {
        this.match = JSON.parse(localStorage.getItem('currentMatch'));
      } else {
        // What if there is no game?!
        // Can we just alert or something? This is really annoying.
        // this.router.navigate(['Matches']);
        return null;
      }
    }
    return this.match;
  }

  public pokeMatch() {
    if (this.getMatch()) {
      this.matchUpdate$.next(this.match.id);
    }
  }

  public getGame(): Game {
    if (!this.match || !this.match.currentGame) {
      if (localStorage.getItem('currentMatch')) {
        this.match = JSON.parse(localStorage.getItem('currentMatch'));
      } else {
        this.router.navigate(['Game']);
      }
    }
    return this.match.currentGame;
  }

  public getPlayer(): Player {
    if (this.match) {
      return this.match.player;
    } else {
      return this.authService.loggedInUser$.value;
    }
  }

  public getOpponent(): Player { return this.getMatch().opponent; }

  setMatches(m: Match[]) {
    this.matches = m;
  }

  setMatch(match: Match) {
    this.match = match;
    this.matchUpdate$.next(this.match.id);
    localStorage.setItem('currentMatch', JSON.stringify(this.match));
  }

  setGame(game: Game) {
    this.match.currentGame = game;
    localStorage.setItem('currentMatch', JSON.stringify(this.match));
  }

}
