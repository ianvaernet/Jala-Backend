import { Board } from './board.model';

export interface IBoardService {
  initiateBoard(): Board;
  saveBoard(board: Board): Promise<void[]>;
}
