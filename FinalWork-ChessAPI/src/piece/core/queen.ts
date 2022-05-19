import { Piece } from './piece';
import { Position } from '../../position';

export class Queen extends Piece {
  canMove(position: Position): boolean {
    if (!super.canMove(position)) return false;
    const isRookMovement =
      position.getFile() === this.position.getFile() || position.getRank() === this.position.getRank();
    const isBishopMovement =
      Math.abs(this.position.getRank() - position.getRank()) ===
      Math.abs(this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0));
    return !this.thereIsAPieceBefore(position) && (isRookMovement || isBishopMovement);
  }

  clone() {
    return new Queen(this.color, this.position.clone());
  }
}
