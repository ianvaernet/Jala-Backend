import { Piece } from './piece';
import { FileNumber, Position, Rank } from '../../position';

export class Bishop extends Piece {
  canMove(position: Position): boolean {
    const differentPosition = super.canMove(position);
    const bishopMovement =
      Math.abs(this.position.getRank() - position.getRank()) ===
      Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber());
    if (!differentPosition || !bishopMovement) return false;

    const pieceInDestination = this.getBoard().getPieceInPosition(position);
    const verticalMovement = this.position.getRank() - position.getRank();
    const verticalDifferential = verticalMovement > 0 ? 1 : -1;
    const horizontalMovement = this.position.getFileAsNumber() - position.getFileAsNumber();
    const horizontalDifferential = horizontalMovement > 0 ? 1 : -1;
    for (let i = 1; i < Math.abs(verticalMovement); i++) {
      const positionInMiddle = new Position(
        (this.position.getFileAsNumber() + i * horizontalDifferential) as FileNumber,
        (this.position.getRank() + i * verticalDifferential) as Rank
      );
      if (this.getBoard().getPieceInPosition(positionInMiddle)) return false;
    }
    return !pieceInDestination || pieceInDestination.getColor() !== this.getColor();
  }
}
