import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/models/player';
import { Card } from 'src/app/models/card';
import { Guess } from 'src/app/models/guess';
import { MissionCardComponent } from '../../mission-card/mission-card.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-end-game-summary',
  templateUrl: './end-game-summary.component.html',
  styleUrls: ['./end-game-summary.component.scss']
})
export class EndGameSummaryComponent implements OnInit {

  @Input() player: Player;
  @Input() hand: Card[];
  @Input() points: number;
  @Input() guesses: Guess[];
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }


  displayMission(card: Card) {
    const initialState = {
      card,
      buttonPhase: 'view'
    };
    this.bsModalRef = this.modalService.show(MissionCardComponent, {initialState});
  }

  getPointsDisplay(card: Card): string {
    switch(card.status) {
      case 'complete':
        return `+ ${card.pointvalue}`;
      case 'brownie-complete':
        return `+ ${card.pointvalue + card.browniepointvalue}`;
      case 'incomplete':
        return `- ${card.pointvalue}`;
      case 'guessed':
        return '+ 0';
    }
  }

}
