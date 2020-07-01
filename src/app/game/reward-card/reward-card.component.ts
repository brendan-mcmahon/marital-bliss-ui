import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Prize as Reward } from 'src/app/models/prize';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-reward-card',
  templateUrl: './reward-card.component.html',
  styleUrls: ['./reward-card.component.scss']
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
    this.apiService.updateCardStatus(this.reward.id, 'complete')
      .subscribe(newStatus => this.reward.status = newStatus.status);
  }

  rejectMission() {
    this.rewardStatusUpdated.emit(false);
  }

  acceptMission() {
    this.rewardStatusUpdated.emit(true);
  }

}
