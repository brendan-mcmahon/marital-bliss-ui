import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { Game } from '../models/game';
import { Router } from '@angular/router';
import { Player } from '../models/player';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Card } from '../models/card';
import { ApiService } from './api.service';
import { Reward } from '../models/reward';
import { RefreshingSubject } from '../RefreshingSubject';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  public matches: Match[];
  public match: Match;
  public matches$ = new RefreshingSubject<Match[]>(null, () => this.apiService.getAllMatches());
  public match$ = new RefreshingSubject<Match>(null, () => this.getMatchOb());
  public player$ = new BehaviorSubject<Player>(null);
  public missionDeck$ = new RefreshingSubject<Card[]>(null, () => this.getMissionDeck());
  public rewardDeck$ = new RefreshingSubject<Reward[]>(null, () => this.getRewardDeck());
  public notification$ = new RefreshingSubject<Notification[]>(null, () => this.apiService.getNotifications());

  constructor(private router: Router, private authService: AuthService, private apiService: ApiService) {
    this.match$.refreshAndSubscribe(m => {
      if (!!m) {
        this.missionDeck$.refresh();
        this.rewardDeck$.refresh();
      }
    });

    this.authService.isLoggedIn$.subscribe(loggedIn => {
      console.log(`isLoggedIn$ Update: ${loggedIn === true}`);
      if (loggedIn === true) {
        this.authService.loggedInUser$.refreshAndSubscribe(u => this.player$.next(u));
        this.match$.next(null);
        // this.missionDeck$.refresh();
        // this.rewardDeck$.refresh();
        this.notification$.refresh();
        this.matches$.refresh();
        console.log(`logged in and refreshed`);
      } else {
        console.log('logged out!!!!');
        this.match$.next(null);
        this.player$.next(null);
        this.missionDeck$.next([]);
        this.rewardDeck$.next([]);
        this.notification$.next([]);
        this.matches$.next([]);
        console.log(`I JUST FUCKING LOGGED OUT SO THIS SHOULD BE NULL: match id: ${JSON.stringify(this.match$.value)}`);
      }
    });
  }

  getMatchOb(): Observable<Match> {
    return of(this.getMatch());
  }

  public getMatch(): Match {
    if (!this.match) {
      if (localStorage.getItem('currentMatch') && localStorage.getItem('currentMatch') !== 'undefined') {
        this.match = JSON.parse(localStorage.getItem('currentMatch'));
      } else {
        return null;
      }
    }
    // console.log(`got match: ${this.match.id}`);
    return this.match;
  }

  public pokeMatch() {
    if (this.getMatch()) {
      this.match$.next(this.match);
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

  public getOpponent(): Player { return this.getMatch().opponent; }

  setMatches(m: Match[]) {
    this.matches = m;
  }

  setMatch(match: Match) {
    this.match = match;
    this.match$.next(this.match);
    localStorage.setItem('currentMatch', JSON.stringify(this.match));
  }

  setGame(game: Game) {
    this.match.currentGame = game;
    localStorage.setItem('currentMatch', JSON.stringify(this.match));
  }

  private getMissionDeck(): Observable<Card[]> {
    return this.apiService.getMissionDeck(this.match$.value.id);
  }

  private getRewardDeck(): Observable<Reward[]> {
    return this.apiService.getRewardDeck(this.match$.value.id);
  }

}
