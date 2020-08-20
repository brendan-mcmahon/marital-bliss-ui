import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card';
import { ApiService } from 'src/app/services/api.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-mission',
  templateUrl: './edit-mission.component.html',
  styleUrls: ['../../card.scss', '../mission-card.component.scss', './edit-mission.component.scss']
})
export class EditMissionComponent implements OnInit {

  @Output() cardUpdated = new EventEmitter<any>();
  @Input() mission: Card;

  constructor(private apiService: ApiService, private matchService: MatchService) { }

  ngOnInit() {
    if (!this.mission) {
      this.mission = new Card();
    }
  }

  onSubmit() {
    this.apiService.upsertMission(this.matchService.getMatch().id, this.mission)
      .subscribe(m => {
        this.cardUpdated.emit();
      });
  }
}
