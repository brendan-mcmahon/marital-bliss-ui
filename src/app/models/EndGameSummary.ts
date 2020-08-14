import { Guess } from './guess';

export class EndGameSummary {
  playerOneGuesses: Guess[];
  playerTwoGuesses: Guess[];
  playerOnePoints: number;
  playerTwoPoints: number;
  winnerIds: number[];
  tieGame: boolean;
}
