import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['../card.scss', './mission-card.component.scss']
})
export class MissionCardComponent implements OnInit {

  @Input() card: Card;
  @Input() editable: boolean;
  @Output() cardStatusUpdated = new EventEmitter<boolean>();
  acceptButtonStyle = '';
  rejectButtonStyle = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  completeMission() {
    this.apiService.updateMissionStatus(this.card.id, 'complete')
      .subscribe(newStatus => this.card.status = newStatus.status);
  }

  completeBrowniePoint() {
    this.apiService.updateMissionStatus(this.card.id, 'brownie-complete')
      .subscribe(newStatus => this.card.status = newStatus.status);
  }

  rejectMission() {
    this.cardStatusUpdated.emit(false);
    this.acceptButtonStyle = '';
    this.rejectButtonStyle = 'depressed-secondary';
  }

  acceptMission() {
    this.cardStatusUpdated.emit(true);
    this.acceptButtonStyle = 'depressed-primary';
    this.rejectButtonStyle = '';
  }
}
