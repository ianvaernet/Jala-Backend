import { Board } from './board.model';

export interface IBoardService {
  saveBoard(board: Board): Promise<void[]>;
}
