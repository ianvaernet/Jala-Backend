import { Piece } from './piece';
import { Position } from '../../position';

export class Knight extends Piece {
  canMove(position: Position): boolean {
    return true;
  }
}
