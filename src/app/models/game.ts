import { Card } from './card';
import { Prize } from './prize';
import { Guess } from './guess';

export class Game {
  id: number;
  endOfGame: Date;
  status: string;
  playerOneReady: boolean;
  playerTwoReady: boolean;
  playerOneHand: Card[];
  playerTwoHand: Card[];
  playerOneRewards: Prize[];
  playerTwoRewards: Prize[];
  playerOneGuesses: Guess[];
  playerTwoGuesses: Guess[];
}
