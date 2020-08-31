import { Component, OnInit, Input } from '@angular/core';
import { Reward } from 'src/app/models/reward';

@Component({
  selector: 'app-endgame-alert',
  templateUrl: './endgame-alert.component.html',
  styleUrls: ['./endgame-alert.component.scss']
})
export class EndgameAlertComponent implements OnInit {

  @Input() reward: Reward;
  @Input() win: boolean;
  @Input() opponentName: string;

  constructor() { }

  ngOnInit() {
  }

}
