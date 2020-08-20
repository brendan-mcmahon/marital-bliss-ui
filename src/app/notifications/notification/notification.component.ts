import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Notification } from 'src/app/models/notification';
import { ApiService } from 'src/app/services/api.service';
import { Card } from 'src/app/models/card';
import { Reward } from 'src/app/models/reward';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class EditNotificationComponent implements OnInit {

  @Input() notification: Notification;
  @Output() closeTrigger = new EventEmitter<any>();
  @Output() responseTrigger = new EventEmitter<any>();

  missionEntityTypes = ['mission', 'guess'];
  rewardEntityTypes = ['reward', 'userReward'];

  stage: string;
  mission: Card;
  newMission: Card;
  reward: Reward;
  newReward: Reward;
  before = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.stage = this.notification.status === 'pending-approval' ? 'approve' : 'acknowledge';
    if (this.missionEntityTypes.includes(this.notification.entityType)) {
      this.apiService.getMissionFromDeck(this.notification.entityId)
        .subscribe(m => {
          this.mission = {...m};
          if (this.notification.action === 'edit' && this.notification.entityType === 'mission') {
            this.consolidateMission(m);
          }
        });
    } else if (this.rewardEntityTypes.includes(this.notification.entityType)) {
      console.log('getting reward...');
      this.apiService.getRewardFromDeck(this.notification.entityId)
        .subscribe(r => {
          this.reward = {...r};
          if (this.notification.action === 'edit' && this.notification.entityType === 'reward') {
            this.consolidateReward(r);
          }
        });
    }
  }

  private consolidateReward(r: Reward) {
    this.before = false;
    this.newReward = { ...r };
    this.notification.fields.forEach(f => {
      this.newReward[f.field] = f.newValue;
    });
  }

  private consolidateMission(m: Card) {
    this.before = false;
    this.newMission = { ...m };
    this.notification.fields.forEach(f => {
      this.newMission[f.field] = f.newValue;
    });
  }

  toggleEditView() {
    this.before = !this.before;
  }

  close() {
    this.closeTrigger.emit();
  }

  accept() {
    this.apiService.updateEditStatus(this.notification.entityType, this.notification.id, 'accepted')
      .subscribe(r => {
        console.log('notification accepted');
        this.notification.status = 'accepted';
        this.responseTrigger.emit({ notification: this.notification, response: r });
      });
  }

  reject() {
    this.apiService.updateEditStatus(this.notification.entityType, this.notification.id, 'rejected')
      .subscribe(r => {
        this.notification.status = 'rejected';
        this.responseTrigger.emit({ notification: this.notification, response: r });
      });
  }

  acknowledge() {
    this.apiService.updateEditStatus(this.notification.entityType, this.notification.id, 'acknowledged')
      .subscribe(r => {
        this.notification.status = 'acknowledged';
        this.responseTrigger.emit({ notification: this.notification, response: r });
      });
  }
}
