import { Piece } from './piece';
import { Position } from '../../position';

export class Bishop extends Piece {
  canMove(position: Position): boolean {
    if (!super.canMove(position)) return false;
    const isBishopMovement =
      Math.abs(this.position.getRank() - position.getRank()) ===
      Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber());
    return !this.thereIsAPieceBefore(position) && isBishopMovement;
  }
}
