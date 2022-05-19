import { Piece } from './piece';
import { Position } from '../../position';

export class Knight extends Piece {
  canMove(position: Position): boolean {
    if (!super.canMove(position)) return false;
    const lateralSteps = Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber());
    const verticalSteps = Math.abs(this.position.getRank() - position.getRank());
    const isKnightMovement =
      (lateralSteps === 2 && verticalSteps === 1) || (lateralSteps === 1 && verticalSteps === 2);
    return isKnightMovement;
  }

  clone() {
    return new Knight(this.color, this.position.clone());
  }
}
