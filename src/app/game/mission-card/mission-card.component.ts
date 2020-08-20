import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, DoCheck } from '@angular/core';
import { Card } from 'src/app/models/card';
import { ApiService } from 'src/app/services/api.service';
import { MatchService } from 'src/app/services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['../card.scss', './mission-card.component.scss']
})
export class MissionCardComponent implements OnInit, DoCheck {

  @Input() card: Card;
  @Input() buttonPhase: string;

  @Output() cardStatusUpdated = new EventEmitter<boolean>();
  @Output() cardGuessed = new EventEmitter<any>();
  @Output() editCard = new EventEmitter<Card>();
  acceptButtonStyle = '';
  rejectButtonStyle = '';
  editMode = false;

  constructor(private apiService: ApiService, private matchService: MatchService, private router: Router) { }

  ngDoCheck() {
    if (this.card.status === 'accepted') {
      this.acceptButtonStyle = 'depressed-primary';
      this.rejectButtonStyle = '';
    } else if (this.card.status === 'rejected') {
      this.acceptButtonStyle = '';
      this.rejectButtonStyle = 'depressed-secondary';
    }
  }

  ngOnInit() {

  }

  completeMission() {
    this.apiService.updateMissionStatus(this.card.id, 'complete')
      .subscribe(cardUpdate => {
        this.card.status = cardUpdate.status;
        this.card.updatedate = cardUpdate.updatedate;
      });
  }

  completeBrowniePoint() {
    this.apiService.updateMissionStatus(this.card.id, 'brownie-complete')
      .subscribe(cardUpdate => {
        this.card.status = cardUpdate.status;
        this.card.updatedate = cardUpdate.updatedate;
      });
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

  disableMission() {
    this.apiService.requestEdit('mission', this.matchService.getMatch().id, this.card.id, 'disable', 'disabled')
      .subscribe(r => {
        this.cardStatusUpdated.emit(false);
      });
  }

  enableMission() {
    this.apiService.requestEdit('mission', this.matchService.getMatch().id, this.card.id, 'enable', 'enabled')
      .subscribe(r => {
        this.cardStatusUpdated.emit(false);
      });
  }

  editMission() {
    this.cardStatusUpdated.emit(true);
  }

  guess() {
    this.cardGuessed.emit();
  }
}
