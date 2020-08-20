import { Component, OnInit } from '@angular/core';
import { Reward } from '../models/reward';
import { ApiService } from '../services/api.service';
import { MatchService } from '../services/match.service';
import { GesturesService } from '../services/gestures.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {

  playerCards: Reward[];
  opponentCards: Reward[];
  loading = true;

  constructor(
    private apiService: ApiService,
    public matchService: MatchService,
    private gestureService: GesturesService) { }

  ngOnInit() {
    this.gestureService.refresh$.subscribe(_ => {
      this.loading = true;
      this.getData();
    });
    this.getData();
  }

  private getData() {
    if (this.matchService.match$.value) {
      this.apiService.getMatchRewards(this.matchService.getMatch().id)
        .subscribe(r => {
          this.playerCards = [...r.filter(c => c.playerId === this.matchService.player$.value.id)];
          this.opponentCards = [...r.filter(c => c.playerId === this.matchService.getOpponent().id)];
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }
}
