import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../match.service';
import { Card } from 'src/app/models/card';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.scss']
})
export class EndgameComponent implements OnInit {

  win: boolean;
  playerOnePoints: number;
  playerTwoPoints: number;

  constructor(private apiService: ApiService, public matchService: MatchService, private router: Router) { }

  ngOnInit() {

    // this.apiService.getMatch(this.matchService.getMatch().id)
    //   .subscribe(match => {
    //     this.matchService.setMatch(match);
    //   });

    this.apiService.getMostRecentGame(this.matchService.getMatch().id)
      .subscribe(game => {
        this.matchService.setGame(game);

        if (this.matchService.getGame().endOfGame === null || this.getTimeRemaining() > 0) {
              this.router.navigate([`Game`]);
        }

        console.log('calculating points');
        this.playerOnePoints = this.getPoints(this.matchService.getGame().playerOneHand);
        this.playerTwoPoints = this.getPoints(this.matchService.getGame().playerTwoHand);

        this.apiService.getGuessedMissions(this.matchService.getGame().id)
        .subscribe(guesses => {
          guesses.filter(g => g.userId === this.matchService.getMatch().player.id).forEach(guess => {

            this.playerOnePoints -= 1;
          });

          guesses.filter(g => g.userId === this.matchService.getMatch().opponent.id).forEach(guess => {
            this.playerTwoPoints -= 1;
          });

          this.win = this.playerOnePoints > this.playerTwoPoints || this.playerOnePoints === this.playerTwoPoints;

          if (this.matchService.getMatch().currentGame.status !== 'finished') {
          // need to check this on the server side to make sure we're not making data changes on an already finished game
            this.apiService.endGame(this.matchService.getGame().id,
              this.win ? this.matchService.getMatch().player.id : this.matchService.getMatch().opponent.id)
              .subscribe(g => this.matchService.setGame(g));
          }
        });
    });
  }

  private getPoints(cards: Card[]): number {
    const reduced = cards.reduce((accumulator, currentCard) => {
      switch (currentCard.status) {
        case 'complete':
          console.log(`${currentCard.title} completed +${currentCard.pointvalue}`);
          return accumulator + currentCard.pointvalue;
        case 'brownie-complete':
          console.log(`${currentCard.title} brownie completed +${currentCard.pointvalue + currentCard.browniepointvalue}`);
          return accumulator + currentCard.pointvalue + currentCard.browniepointvalue;
        case 'incomplete' :
          console.log(`${currentCard.title} completed -${currentCard.pointvalue}`);
          return accumulator - currentCard.pointvalue;
        case 'guessed' :
          console.log(`${currentCard.title} completed +0`);
          return accumulator;
        default:
          console.log('something went wrong');
          return accumulator;
      }
    }, 0);
    console.log(reduced);
    return reduced;
  }

  startNewGame() {
    this.apiService.addGame(this.matchService.getMatch().id)
      .subscribe(g => {
        this.matchService.setGame(g);
        console.log(`new game: ${this.matchService.getGame().id}`);
        this.router.navigate(['Game']);
      });
  }

  getTimeRemaining(): number {
    return new Date(this.matchService.getGame().endOfGame).getTime() - new Date().getTime();
  }
}
