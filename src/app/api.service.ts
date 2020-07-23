import { Injectable } from '@angular/core';
import { Match } from './models/match';
import { Observable, throwError } from 'rxjs';
import { Game } from './models/game';
import { HttpClient } from '@angular/common/http';
import { Player } from './models/player';
import { Card } from './models/card';
import { Reward } from './models/reward';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://localhost:3001';

  constructor(private http: HttpClient, private router: Router) { }

  getMatch(matchId): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}/match/${matchId}`);
  }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/match`);
  }

  addMatch(opponentEmail: string): Observable<Match> {
    return this.http.post<Match>(`${this.baseUrl}/match`, { opponentEmail });
  }

  addGame(matchId: number): Observable<Game> {
    let endOfGame = new Date();
    endOfGame = new Date(endOfGame.getTime() + (1000 * 60 * 60 * 24 * 7));
    return this.http.post<Game>(`${this.baseUrl}/game`, {matchId, endOfGame})
      .pipe(catchError((error) => {
        if (error.status === 409) {
          this.router.navigate(['Game']);
        }
        return throwError(error);
      }));
  }

  endGame(gameId: number, winnerId: number): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/game/end/${gameId}`, { winnerId });
  }

  getMostRecentGame(matchId: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/game/mostRecent/${matchId}`);
  }

  updateMissionStatus(missionId: number, status: string): Observable<{status: string}> {
    return this.http.put<{status: string}>(`${this.baseUrl}/game/mission`, { missionId, status });
  }

  updateRewardStatus(rewardId: number, status: string): Observable<{status: string}> {
    return this.http.put<{status: string}>(`${this.baseUrl}/game/reward`, { rewardId, status });
  }

  startGame(gameId: number, acceptedMissions: number[], acceptedReward: number): Observable<Game> {
    console.log('starting game...');
    return this.http.post<Game>(`${this.baseUrl}/game/start/${gameId}`, { acceptedMissions, acceptedReward });
  }

  getAllUsers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/users`);
  }

  getMissionDeck(matchId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrl}/match/missions/${matchId}`);
  }

  guessMission(gameId: number, missionId: number): Observable<{ correct: boolean }> {
    return this.http.post<{ correct: boolean }>(`${this.baseUrl}/game/guess`, { gameId, missionId });
  }

  getGuessedMissions(gameId: number): Observable<{ mission: Card, userId: number }[]> {
    return this.http.get<{ mission: Card, userId: number }[]>(`${this.baseUrl}/game/guesses/${gameId}`);
  }

  getMatchRewards(matchId: number): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${this.baseUrl}/match/rewards/${matchId}`);
  }

  submitBugReport(report: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/bug`, { report });
  }
}
