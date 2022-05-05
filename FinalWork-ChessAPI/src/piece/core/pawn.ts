import { Piece } from './piece';
import { Position } from '../../position';

export class Pawn extends Piece {
  canMove(position: Position): boolean {
    return true;
  }
}
