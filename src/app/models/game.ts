import { Card } from './card';
import { Reward } from './reward';
import { Guess } from './guess';

export class Game {
  id: number;
  endOfGame: Date;
  status: string;
  playerOneReady: boolean;
  playerTwoReady: boolean;
  playerOneHand: Card[];
  playerTwoHand: Card[];
  playerOneRewards: Reward[];
  playerTwoRewards: Reward[];
  playerOneGuesses: Guess[];
  playerTwoGuesses: Guess[];
}
