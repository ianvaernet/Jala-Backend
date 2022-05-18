import { Piece } from './piece';
import { FileNumber, Position, Rank } from '../../position';

export class King extends Piece {
  canMove(position: Position): boolean {
    if (!super.canMove(position)) return false;
    const isKingMovement =
      Math.abs(this.position.getRank() - position.getRank()) <= 1 &&
      Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber()) <= 1;
    return isKingMovement;
  }

  getAvailableMovements(): Position[] {
    const movements: Position[] = [];
    const currentRank = this.position.getRank();
    const currentFile = this.position.getFileAsNumber();
    for (let rank = currentRank - 1; rank <= currentRank + 1; rank++) {
      for (let file = currentFile - 1; file <= currentFile + 1; file++) {
        const position = new Position(file as FileNumber, rank as Rank);
        if (rank > 0 && file >= 0 && this.canMove(position)) movements.push(position);
      }
    }
    return movements;
  }
}
