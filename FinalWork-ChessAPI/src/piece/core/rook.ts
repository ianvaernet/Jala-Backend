import { Piece } from './piece';
import { Position } from '../../position';

export class Rook extends Piece {
  canMove(position: Position): boolean {
    if (!super.canMove(position)) return false;
    const isRookMovement = position.getFile() === this.position.getFile() || position.getRank() === this.position.getRank();
    return !this.thereIsAPieceBefore(position) && isRookMovement;
  }
}
