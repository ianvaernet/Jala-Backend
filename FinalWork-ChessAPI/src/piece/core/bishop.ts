import { Piece } from './piece';
import { Position } from '../../position';

export class Bishop extends Piece {
  canMove(position: Position): boolean {
    return true;
  }
}
