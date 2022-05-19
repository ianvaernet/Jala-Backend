import { Piece } from './piece';
import { Position } from '../../position';

export class Bishop extends Piece {
  canMoveTo(position: Position): boolean {
    if (!super.canMoveTo(position)) return false;
    const isBishopMovement =
      Math.abs(this.position.getRank() - position.getRank()) ===
      Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber());
    return isBishopMovement && !this.thereIsAPieceBefore(position);
  }

  clone() {
    return new Bishop(this.color, this.position.clone());
  }
}
