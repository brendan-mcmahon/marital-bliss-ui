import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../match.service';
import { Card } from 'src/app/models/card';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { EndGameSummary } from 'src/app/models/EndGameSummary';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.scss']
})
export class EndgameComponent implements OnInit {

  loading = true;
  win: boolean;
  summary: EndGameSummary;

  constructor(private apiService: ApiService, public matchService: MatchService, private router: Router) { }

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
              this.win = response.summary.winnerIds.includes(this.matchService.getPlayer().id);
              this.loading = false;
            });
        }
    });
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
