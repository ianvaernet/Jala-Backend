import { Board } from './board';

export interface IBoardService {
  saveBoard(board: Board): Promise<void[]>;
}
