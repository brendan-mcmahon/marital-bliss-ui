import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reward } from 'src/app/models/reward';
import { ApiService } from 'src/app/api.service';
import { MatchService } from 'src/app/match.service';

@Component({
  selector: 'app-reward-card',
  templateUrl: './reward-card.component.html',
  styleUrls: ['../card.scss', './reward-card.component.scss']
})
export class RewardCardComponent implements OnInit {

  @Input() reward: Reward;
  @Input() buttonPhase: string;
  @Output() rewardStatusUpdated = new EventEmitter<boolean>();
  statusStyle = 'pending';
  buttonStyle: string;

  constructor(private matchService: MatchService, private apiService: ApiService) { }

  ngOnInit() {
    this.statusStyle = this.reward.status;
  }

  complete() {
    this.apiService.updateRewardStatus(this.reward.id, 'delivered')
      .subscribe(response => {
        this.reward.status = response.status;
        this.reward.deliveryDate = response.deliverydate;
      });
  }

  chooseReward() {
    this.buttonStyle = 'depressed-primary';
    this.rewardStatusUpdated.emit(true);
  }

  editReward() {

  }

  disableReward() {
    this.apiService.requestEdit('reward', this.matchService.getMatch().id, this.reward.id, 'disable', 'disabled')
      .subscribe(r => {
        this.rewardStatusUpdated.emit(false);
      });
  }

  enableReward() {
    this.apiService.requestEdit('reward', this.matchService.getMatch().id, this.reward.id, 'enable', 'enabled')
      .subscribe(r => {
        this.rewardStatusUpdated.emit(false);
      });
  }
}
