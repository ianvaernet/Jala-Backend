import { Piece } from './piece';
import { Position } from '../../position';

export class King extends Piece {
  canMove(position: Position): boolean {
    if (!super.canMove(position)) return false;
    const isKingMovement =
      Math.abs(this.position.getRank() - position.getRank()) <= 1 &&
      Math.abs(this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0)) <= 1;
    return isKingMovement;
  }
}
