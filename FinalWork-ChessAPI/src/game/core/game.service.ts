import { Color } from '../../piece';
import { Position } from '../../position';
import { Game } from './game';

export interface IGameService {
  getGame(): Promise<Game>;
  startNewGame(): Promise<Game>;
  move(color: Color, from: Position, to: Position): Promise<Game>;
}
