import { Piece } from './piece';
import { Position } from '../../position';

export class Queen extends Piece {
  canMove(position: Position): boolean {
    const differentPosition = super.canMove(position);
    const rookMovement = position.getFile() === this.position.getFile() || position.getRank() === this.position.getRank();
    const bishopMovement =
      Math.abs(this.position.getRank() - position.getRank()) ===
      Math.abs(this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0));
    return differentPosition && (rookMovement || bishopMovement);
  }
}
