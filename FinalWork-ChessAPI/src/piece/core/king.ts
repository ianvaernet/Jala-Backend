import { Piece } from './piece';
import { Position } from '../../position';

export class King extends Piece {
  canMove(position: Position): boolean {
    const differentPosition = super.canMove(position);
    const kingMovement =
      Math.abs(this.position.getRank() - position.getRank()) <= 1 &&
      Math.abs(this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0)) <= 1;

    const pieceInDestination = this.getBoard().getPieceInPosition(position);

    return differentPosition && kingMovement && (!pieceInDestination || pieceInDestination.getColor() !== this.getColor());
  }
}
