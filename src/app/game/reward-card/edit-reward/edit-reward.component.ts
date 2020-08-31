import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Reward } from 'src/app/models/reward';
import { ApiService } from 'src/app/services/api.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-reward',
  templateUrl: './edit-reward.component.html',
  styleUrls: ['../../card.scss', './edit-reward.component.scss']
})
export class EditRewardComponent implements OnInit {

  @Output() cardUpdated = new EventEmitter<any>();
  @Input() reward: Reward;


  constructor(private apiService: ApiService, private matchService: MatchService) { }


  ngOnInit() {
    if (!this.reward) {
      this.reward = new Reward();
    }
  }

  onSubmit() {
    this.apiService.upsertReward(this.matchService.getMatch().id, this.reward)
      .subscribe(m => {
        this.cardUpdated.emit();
      });
  }

}
