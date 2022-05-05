import { Piece } from './piece';
import { Position } from '../../position';

export class Rook extends Piece {
  canMove(position: Position): boolean {
    return true;
  }
}
