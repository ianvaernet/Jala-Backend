import { Piece } from './piece';
import { Position } from '../../position';

export class Bishop extends Piece {
  canMove(position: Position): boolean {
    const differentPosition = super.canMove(position);
    const bishopMovement =
      Math.abs(this.position.getRank() - position.getRank()) ===
      Math.abs(this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0));
    return differentPosition && bishopMovement;
  }
}
