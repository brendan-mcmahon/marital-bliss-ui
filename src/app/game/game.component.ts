import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  displayStatus = 'new';
  timeRemaining: number;
  loading = true;

  constructor(public matchService: MatchService, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
      this.apiService.getMostRecentGame(this.matchService.getMatch().id)
        .subscribe(g => {
          this.loading = false;
          if (g) {
            this.matchService.setGame(g);
            if (this.matchService.getGame().endOfGame !== null) {
              this.timeRemaining = this.getTimeRemaining();
              if (this.timeRemaining <= 0) {
                    this.router.navigate([`EndGame`]);
              }
            }
          }
        });
  }

  acceptAll() {
    this.matchService.getGame().playerOneHand.forEach(h => h.status = 'accepted');
  }

  readyToStart() {
    return (this.matchService.getGame().playerOneHand.every(h => h.status !== 'pending')
    && this.matchService.getGame().playerOneRewards.every(r => r.status !== 'pending')
    && this.matchService.getGame().status !== 'in progress');
  }

  updateMissionStatus(isAccepted: boolean, index: number) {
    this.matchService.getGame().playerOneHand[index].status = isAccepted ? 'accepted' : 'rejected';
  }

  updateRewardStatus(isAccepted: boolean, index: number) {
    this.matchService.getGame().playerOneRewards.forEach(r => r.status = 'rejected');
    this.matchService.getGame().playerOneRewards[index].status = 'accepted';
  }

  showStartButton() {
    return this.matchService.getGame().status !== 'in progress'
      && !this.matchService.getGame().playerOneReady;
  }

  startGame() {
    this.apiService.startGame(
        this.matchService.getGame().id,
        this.matchService.getGame().playerOneHand.filter(c => c.status === 'accepted').map(c => c.id),
        this.matchService.getGame().playerOneRewards.filter(r => r.status === 'accepted')[0].id)
      .subscribe(game => this.matchService.setGame(game) );
  }

  getGameStatus(): string {
    if (this.matchService.getGame().status === 'pending') {
      if (this.matchService.getGame().playerOneHand.every(h => h.status !== 'pending')
      && this.matchService.getGame().playerOneRewards.every(r => r.status !== 'pending')) {
        return 'pending';
      } else {
        return 'new';
      }
    }
    return this.matchService.getGame().status;
  }

  getTimeRemaining(): number {
    return new Date(this.matchService.getGame().endOfGame).getTime() - new Date().getTime();
  }

  newGame() {
    this.apiService.addGame(this.matchService.getMatch().id)
      .subscribe(g => {
        this.matchService.setGame(g);
      });
  }

}
