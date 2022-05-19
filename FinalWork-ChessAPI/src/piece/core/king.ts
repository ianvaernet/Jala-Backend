import { Piece } from './piece';
import { FileNumber, Position, Rank } from '../../position';

export class King extends Piece {
  canMoveTo(position: Position): boolean {
    if (!super.canMoveTo(position)) return false;
    const isKingMovement =
      Math.abs(this.position.getRank() - position.getRank()) <= 1 &&
      Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber()) <= 1;
    return isKingMovement;
  }

  getAvailableMovements(): Position[] {
    const movements: Position[] = [];
    const currentRank = this.position.getRank();
    const currentFile = this.position.getFileAsNumber();
    const MIN_RANK = 1;
    const MAX_RANK = 8;
    const MIN_FILE = 0;
    const MAX_FILE = 7;
    for (let rank = currentRank - 1; rank <= currentRank + 1; rank++) {
      for (let file = currentFile - 1; file <= currentFile + 1; file++) {
        const position = new Position(file as FileNumber, rank as Rank);
        if (
          rank >= MIN_RANK &&
          rank <= MAX_RANK &&
          file >= MIN_FILE &&
          file <= MAX_FILE &&
          this.canMoveTo(position)
        ) {
          movements.push(position);
        }
      }
    }
    return movements;
  }

  clone() {
    return new King(this.color, this.position.clone());
  }
}
