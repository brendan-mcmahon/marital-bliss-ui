import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatchService } from 'src/app/match.service';
import { Card } from 'src/app/models/card';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MissionCardComponent } from '../mission-card/mission-card.component';
import { GuessResultComponent } from './guess-result/guess-result.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guess-mission',
  templateUrl: './guess-mission.component.html',
  styleUrls: ['./guess-mission.component.scss']
})
export class GuessMissionComponent implements OnInit {

  bsModalRef: BsModalRef;
  deck: Card[];
  deckDisplay: Card[];
  guessedCards: Card[];
  selectedMission: Card;
  filterText = '';
  guessStatus: string;
  guessEnabled = false;

  constructor(
    private apiService: ApiService,
    public matchService: MatchService,
    private modalService: BsModalService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.matchService.getMatch() === null) {
      this.router.navigate(['Matches']);
    }

    this.guessEnabled = this.matchService.getGame().status === 'in progress';
    this.apiService.getMissionDeck(this.matchService.getMatch().id)
      .subscribe(d => {
        this.apiService.getGuessedMissions(this.matchService.getGame().id)
        .subscribe(g => {
          const alreadyGuessedIds = g
            .filter(guessed => guessed.userId === this.matchService.getMatch().player.id)
            .map(guessed => guessed.card.id);
          this.deck = d.filter(card => !alreadyGuessedIds.includes(card.id) && card.status === 'enabled');
          this.deckDisplay = [...this.deck];
        });
      });
  }

  openResultModal(correct: boolean) {
    const initialState = {
      missionTitle: this.selectedMission.title,
      opponentName: this.matchService.getOpponent().firstName,
      correct
    };
    this.bsModalRef = this.modalService.show(GuessResultComponent, {initialState});
    this.bsModalRef.content.closeTrigger.subscribe((value: any) => {
      this.bsModalRef.hide();
    });
  }

  guess(mission: Card) {
    this.apiService.guessMission(this.matchService.getGame().id, mission.id)
      .subscribe(response => {
        this.openResultModal(response.correct);
        this.deck = this.deck.filter(d => d.id !== mission.id);
        this.selectedMission = null;
        this.deckDisplay = [...this.deck];
      });
  }

  missionSelected(mission: Card) {
    this.selectedMission = mission;
    const initialState = {
        card: mission,
        buttonPhase: 'guess'
      };
    this.bsModalRef = this.modalService.show(MissionCardComponent, {initialState});
    this.bsModalRef.content.cardGuessed.subscribe((value: any) => {
      this.bsModalRef.hide();
      this.guess(mission);
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  filter() {
    if (this.filterText !== '') {
      this.deckDisplay = this.deck.filter(mission => {
        return  mission.title.match(new RegExp(this.filterText, 'i'))
          || mission.description.match(new RegExp(this.filterText, 'i'))
      });
    } else {
      this.deckDisplay = [...this.deck];
    }
  }
}
