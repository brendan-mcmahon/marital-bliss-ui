import { Player } from './player';
import { Game } from './game';

export class Match {
  id: number;
  player: Player;
  opponent: Player;
  currentGame: Game;
}
