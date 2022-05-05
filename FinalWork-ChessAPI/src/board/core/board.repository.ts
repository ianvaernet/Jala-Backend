import { Board } from './board.model';

export interface IBoardRepository {
  getBoard(): Promise<Board>;
}
