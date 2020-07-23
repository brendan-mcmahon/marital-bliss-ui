import { Injectable } from '@angular/core';
import { Match } from './models/match';
import { Game } from './models/game';
import { Router } from '@angular/router';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  public match: Match;

  constructor(private router: Router) { }

  public getMatch(): Match {
    if (!this.match) {
      if (localStorage.getItem('currentMatch')) {
        this.match = JSON.parse(localStorage.getItem('currentMatch'));
      } else {
        this.router.navigate(['Game']);
      }
    }
    return this.match;
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

  public getPlayer(): Player { return this.getMatch().player; }

  public getOpponent(): Player { return this.getMatch().opponent; }

  setMatch(match: Match) {
    this.match = match;
    localStorage.setItem('currentMatch', JSON.stringify(this.match));
  }

  setGame(game: Game) {
    this.match.currentGame = game;
    localStorage.setItem('currentMatch', JSON.stringify(this.match));
  }

}
