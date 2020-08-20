import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { Game } from '../models/game';
import { Router } from '@angular/router';
import { Player } from '../models/player';
import { AuthService } from './auth/auth.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Card } from '../models/card';
import { ApiService } from './api.service';
import { Reward } from '../models/reward';
import { RefreshingSubject } from '../RefreshingSubject';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  notificationGetter = (() => { console.log('getting notifications'); return this.apiService.getNotifications(); });

  public matches: Match[];
  public match: Match;
  public matches$ = new RefreshingSubject<Match[]>(null, () => this.apiService.getAllMatches());
  public match$ = new BehaviorSubject<number>(null);
  public player$ = new BehaviorSubject<Player>(null);
  public missionDeck$ = new RefreshingSubject<Card[]>(null, () => this.apiService.getMissionDeck(this.getMatch().id));
  public rewardDeck$ = new RefreshingSubject<Reward[]>(null, () => this.apiService.getRewardDeck(this.getMatch().id));
  // public notification$ = new RefreshingSubject<Notification[]>(null, () => this.apiService.getNotifications());
  public notification$ = new RefreshingSubject<Notification[]>(null, this.notificationGetter);


  constructor(private router: Router, private authService: AuthService, private apiService: ApiService) {
    this.authService.loggedInUser$.refreshAndSubscribe(u => this.player$.next(u));
   }

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
      this.match$.next(this.match.id);
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
    this.match$.next(this.match.id);
    localStorage.setItem('currentMatch', JSON.stringify(this.match));
  }

  setGame(game: Game) {
    this.match.currentGame = game;
    localStorage.setItem('currentMatch', JSON.stringify(this.match));
  }

  private getMissionDeck() {
    this.apiService.getMissionDeck(this.getMatch().id)
      .subscribe(d => {
        this.missionDeck$.next(d);
      });
  }

}
