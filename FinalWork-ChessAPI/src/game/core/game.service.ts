import { Game } from './game.model';

export interface IGameService {
  getGame(): Promise<Game>;
  startNewGame(): Promise<Game>;
}
