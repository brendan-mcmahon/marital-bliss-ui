import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reward } from 'src/app/models/reward';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-reward-card',
  templateUrl: './reward-card.component.html',
  styleUrls: ['../card.scss', './reward-card.component.scss']
})
export class RewardCardComponent implements OnInit {

  @Input() reward: Reward;
  @Input() editable: boolean;
  @Output() rewardStatusUpdated = new EventEmitter<boolean>();
  statusStyle = 'pending';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.statusStyle = this.reward.status;
  }

  complete() {
    console.log(`reward id: ${this.reward.id}`);
    this.apiService.updateRewardStatus(this.reward.id, 'delivered')
      .subscribe(newStatus => this.reward.status = newStatus.status);
  }

  chooseReward() {
    this.rewardStatusUpdated.emit(true);
  }
}
