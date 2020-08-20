import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Card } from 'src/app/models/card';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { EndGameSummary } from 'src/app/models/EndGameSummary';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RewardCardComponent } from '../reward-card/reward-card.component';
import { Reward } from 'src/app/models/reward';
import { EndgameAlertComponent } from './endgame-alert/endgame-alert.component';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.scss']
})
export class EndgameComponent implements OnInit {

  loading = true;
  win: boolean;
  summary: EndGameSummary;
  bsModalRef: BsModalRef;
  winnerReward: Reward;

  constructor(
    private apiService: ApiService,
    public matchService: MatchService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.apiService.getMostRecentGame(this.matchService.getMatch().id)
      .subscribe(game => {
        this.matchService.setGame(game);

        if (this.matchService.getGame().endOfGame === null || this.getTimeRemaining() > 0) {
          console.log('Game\'s not over, redirecting to Game');
          this.router.navigate([`Game`]);
        } else {
          this.apiService.endGame(this.matchService.getGame().id)
            .subscribe(response => {
              this.matchService.setGame(response.game);
              this.summary = response.summary;
              this.win = response.summary.winnerIds.includes(this.matchService.player$.value.id);

              this.winnerReward = this.win
                ? this.matchService.getGame().playerOneRewards[0]
                : this.matchService.getGame().playerTwoRewards[0];

              this.displayReward(this.winnerReward);

              this.loading = false;
            });
        }
    });
  }


  displayReward(reward: Reward) {
    const initialState = {
      reward,
      win: this.win,
      opponentName: this.matchService.getOpponent().firstName
    };
    this.bsModalRef = this.modalService.show(EndgameAlertComponent, {initialState});
  }

  getPointsDisplay(card: Card): string {
    switch(card.status) {
      case 'complete':
        return `+ ${card.pointvalue}`;
      case 'brownie-complete':
        return `+ ${card.pointvalue + card.browniepointvalue}`;
      case 'incomplete':
        return `- ${card.pointvalue}`;
      case 'guessed':
        return '+ 0';
    }
  }

  startNewGame() {
    this.apiService.addGame(this.matchService.getMatch().id)
      .subscribe(g => {
        this.matchService.setGame(g);
        this.router.navigate(['Game']);
      });
  }

  getTimeRemaining(): number {
    return new Date(this.matchService.getGame().endOfGame).getTime() - new Date().getTime();
  }
}
