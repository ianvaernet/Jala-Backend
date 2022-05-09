import { Piece } from './piece';
import { Position } from '../../position';

export class Pawn extends Piece {
  canMove(position: Position): boolean {
    const differentPosition = super.canMove(position);
    const isInInitialPosition =
      (this.getColor() === 'White' && this.position.getRank() == 2) ||
      (this.getColor() === 'Black' && this.position.getRank() == 7);
    const forwardValue = this.getColor() === 'White' ? 1 : -1;
    const oneStepForward = this.position.getRank() + forwardValue === position.getRank();
    const twoStepsForward = this.position.getRank() + forwardValue * 2 === position.getRank();
    const pawnMovement =
      this.position.getFile() === position.getFile() && (oneStepForward || (isInInitialPosition && twoStepsForward));
    return differentPosition && pawnMovement;
  }
}
