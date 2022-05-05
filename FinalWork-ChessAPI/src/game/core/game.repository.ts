import { Game } from './game.model';

type Success = boolean;

export interface IGameRepository {
  getGame(): Promise<Game | null>;
  delete(game: Game): Promise<Success>;
  save(game: Game): Promise<void>;
}
