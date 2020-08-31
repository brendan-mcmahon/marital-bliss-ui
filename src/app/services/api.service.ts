import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { Observable, throwError } from 'rxjs';
import { Game } from '../models/game';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { Card } from '../models/card';
import { Guess } from '../models/guess';
import { Reward } from '../models/reward';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Notification } from '../models/notification';
import { EndGameSummary } from '../models/EndGameSummary';

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
    console.log('getting matches from api');
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
          console.log('409, redirecting to Game');
          this.router.navigate(['Game']);
        }
        return throwError(error);
      }));
  }

  endGame(gameId: number): Observable<{ summary: EndGameSummary, game: Game }> {
    return this.http.post<{ summary: EndGameSummary, game: Game }>(`${this.baseUrl}/game/end/${gameId}`, { });
  }

  getMostRecentGame(matchId: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/game/mostRecent/${matchId}`);
  }

  updateMissionStatus(missionId: number, status: string): Observable<{status: string, updatedate: Date}> {
    return this.http.put<{status: string, updatedate: Date}>(`${this.baseUrl}/game/mission`, { missionId, status });
  }

  updateRewardStatus(rewardId: number, status: string): Observable<{status: string, deliverydate: Date}> {
    return this.http.put<{status: string, deliverydate: Date }>(`${this.baseUrl}/game/reward`, { rewardId, status });
  }

  startGame(gameId: number, acceptedMissions: number[], acceptedRewardId: number): Observable<Game> {
    console.log('starting game...');
    return this.http.post<Game>(`${this.baseUrl}/game/start/${gameId}`, { acceptedMissions, acceptedRewardId });
  }

  getAllUsers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/users`);
  }

  getUser(): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/users/me`);
  }

  getMissionDeck(matchId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrl}/match/missionDeck/${matchId}`);
  }

  getRewardDeck(matchId: number): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${this.baseUrl}/match/rewardDeck/${matchId}`);
  }

  guessMission(gameId: number, missionId: number): Observable<{ correct: boolean }> {
    return this.http.post<{ correct: boolean }>(`${this.baseUrl}/game/guess`, { gameId, missionId });
  }

  getGuessedMissions(gameId: number): Observable<Guess[]> {
    return this.http.get<Guess[]>(`${this.baseUrl}/game/guesses/${gameId}`);
  }

  getMatchRewards(matchId: number): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${this.baseUrl}/match/rewards/${matchId}`);
  }

  submitBugReport(report: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/bug`, { report });
  }

  updateUserAccount(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.baseUrl}/account`, player);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/notifications`);
  }

  getEndGameNotification(gameId: number): Observable<Notification>  {
    return this.http.get<Notification>(`${this.baseUrl}/notifications/endGame/${gameId}`);
  }

  updateEditStatus(entityType: string, editId: number, status: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/edit/response/${entityType}`, { editId, status });
  }

  requestEdit(entityType: string, matchId: number, entityId: number, action: string, newValue: string = null): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/edit/request`, { entityType, matchId, entityId, action, newValue });
  }

  getMissionFromDeck(missionId: number): Observable<Card> {
    return this.http.get<Card>(`${this.baseUrl}/match/mission/${missionId}`);
  }

  getRewardFromDeck(rewardId: number): Observable<Reward> {
    return this.http.get<Reward>(`${this.baseUrl}/match/reward/${rewardId}`);
  }

  upsertMission(matchId: number, mission: Card): Observable<Card> {
    return this.http.put<Card>(`${this.baseUrl}/game/missiondeck`, { matchId, mission });
  }

  upsertReward(matchId: number, reward: Reward): Observable<Reward> {
    return this.http.put<Reward>(`${this.baseUrl}/game/rewarddeck`, { matchId, reward });
  }

  submitPasswordResetRequest(email: string): Observable<any> {
    console.log('requesting password reset');
    return this.http.post<any>(`${this.baseUrl}/account/reset/request`, { email });
  }

  submitNewPassword(email: string, code: string, password: string, confirmPassword): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/account/reset/${code}`, { email, password, confirmPassword });
  }
}
