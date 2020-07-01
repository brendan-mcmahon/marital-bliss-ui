import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatchService } from 'src/app/match.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-guess-mission',
  templateUrl: './guess-mission.component.html',
  styleUrls: ['./guess-mission.component.scss']
})
export class GuessMissionComponent implements OnInit {

  deck: Card[];
  deckDisplay: Card[];
  guessedCards: Card[];
  selectedMission: Card;
  filterText = '';

  constructor(private apiService: ApiService, public matchService: MatchService) { }

  ngOnInit() {
    // get all mission cards
    this.apiService.getMissionDeck(this.matchService.getMatch().id)
      .subscribe(d => {
        this.apiService.getGuessedMissions(this.matchService.getGame().id)
        .subscribe(g => {
          const alreadyGuessedIds = g
            .filter(guessed => guessed.userId === this.matchService.getMatch().player.id)
            .map(guessed => guessed.mission.id);
          this.deck = d.filter(card => !alreadyGuessedIds.includes(card.id));
          this.deckDisplay = [...this.deck];
        });
      });
  }

  guess() {
    this.apiService.guessMission(this.matchService.getGame().id, this.selectedMission.id)
      .subscribe(response => {
        console.log(response.correct ? 'You got it!' : 'Oh no, you were wrong!');
        this.deck = this.deck.filter(d => d.id !== this.selectedMission.id);
        this.deckDisplay = [...this.deck];
      });
  }

  missionSelected(mission: Card) {
    this.selectedMission = mission;
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
