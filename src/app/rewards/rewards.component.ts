import { Component, OnInit } from '@angular/core';
import { Reward } from '../models/reward';
import { ApiService } from '../api.service';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {

  playerCards: Reward[];
  opponentCards: Reward[];

  constructor(private apiService: ApiService, public matchService: MatchService) { }

  ngOnInit() {
    this.apiService.getMatchRewards(this.matchService.getMatch().id)
      .subscribe(r => {
        this.playerCards = [...r.filter(c => c.playerId === this.matchService.getPlayer().id)];
        this.opponentCards = [...r.filter(c => c.playerId === this.matchService.getOpponent().id)];
      });
  }

}
