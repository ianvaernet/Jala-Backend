import { Piece } from './piece';
import { Position } from '../../position';

export class Knight extends Piece {
  canMove(position: Position): boolean {
    const differentPosition = super.canMove(position);
    const lateralSteps = Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber());
    const verticalSteps = Math.abs(this.position.getRank() - position.getRank());
    const knightMovement = (lateralSteps === 2 && verticalSteps === 1) || (lateralSteps === 1 && verticalSteps === 2);
    return differentPosition && knightMovement;
  }
}
