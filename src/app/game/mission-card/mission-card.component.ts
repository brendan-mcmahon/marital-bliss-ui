import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss']
})
export class MissionCardComponent implements OnInit {

  @Input() card: Card;
  @Input() editable: boolean;
  @Output() cardStatusUpdated = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  completeMission() {
    this.apiService.updateCardStatus(this.card.id, 'complete')
      .subscribe(newStatus => this.card.status = newStatus.status);
  }

  completeBrowniePoint() {
    this.apiService.updateCardStatus(this.card.id, 'brownie-complete')
      .subscribe(newStatus => this.card.status = newStatus.status);
  }

  rejectMission() {
    this.cardStatusUpdated.emit(false);
  }

  acceptMission() {
    this.cardStatusUpdated.emit(true);
  }
}
