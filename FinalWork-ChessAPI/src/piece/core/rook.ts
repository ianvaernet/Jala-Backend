import { Piece } from './piece';
import { Position } from '../../position';

export class Rook extends Piece {
  canMoveTo(position: Position): boolean {
    if (!super.canMoveTo(position)) return false;
    const isRookMovement =
      position.getFile() === this.position.getFile() || position.getRank() === this.position.getRank();
    return !this.thereIsAPieceBefore(position) && isRookMovement;
  }

  clone() {
    return new Rook(this.color, this.position.clone());
  }
}
