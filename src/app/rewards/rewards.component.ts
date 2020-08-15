import { Component, OnInit } from '@angular/core';
import { Reward } from '../models/reward';
import { ApiService } from '../api.service';
import { MatchService } from '../match.service';
import { Router } from '@angular/router';
import { GesturesService } from '../gestures.service';

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
    private router: Router,
    private gestureService: GesturesService) { }

  ngOnInit() {
    this.gestureService.refresh$.subscribe(_ => {
      this.loading = true;
      this.getData();
    });
    this.getData();
  }

  private getData() {
    if (this.matchService.getMatch() === null) {
      console.warn('No match selected');
    }
    this.apiService.getMatchRewards(this.matchService.getMatch().id)
      .subscribe(r => {
        this.playerCards = [...r.filter(c => c.playerId === this.matchService.getPlayer().id)];
        this.opponentCards = [...r.filter(c => c.playerId === this.matchService.getOpponent().id)];
        this.loading = false;
      });
  }
}
