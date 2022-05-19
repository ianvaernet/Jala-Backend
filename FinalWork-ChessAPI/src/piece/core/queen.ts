import { Piece } from './piece';
import { Position } from '../../position';

export class Queen extends Piece {
  canMoveTo(position: Position): boolean {
    if (!super.canMoveTo(position)) return false;
    const isRookMovement =
      position.getFile() === this.position.getFile() || position.getRank() === this.position.getRank();
    const isBishopMovement =
      Math.abs(this.position.getRank() - position.getRank()) ===
      Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber());
    return !this.thereIsAPieceBefore(position) && (isRookMovement || isBishopMovement);
  }

  clone() {
    return new Queen(this.color, this.position.clone());
  }
}
