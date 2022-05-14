import { Piece } from './piece';
import { Position } from '../../position';

export class Pawn extends Piece {
  canMove(position: Position): boolean {
    if (!super.canMove(position)) return false;
    const isInInitialPosition =
      (this.getColor() === 'White' && this.position.getRank() == 2) ||
      (this.getColor() === 'Black' && this.position.getRank() == 7);
    const forwardValue = this.getColor() === 'White' ? 1 : -1;
    const oneStepForward = this.position.getRank() + forwardValue === position.getRank();
    const twoStepsForward = this.position.getRank() + forwardValue * 2 === position.getRank();
    const oneStepAside = Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber()) === 1;
    const isPawnMovement =
      this.position.getFile() === position.getFile() && (oneStepForward || (isInInitialPosition && twoStepsForward));
    const isPawnCaptureMovement =
      oneStepForward &&
      oneStepAside &&
      this.getBoard().getPieceInPosition(position) !== null &&
      (this.getBoard().getPieceInPosition(position) as Piece).getColor() !== this.getColor();
    return isPawnMovement || isPawnCaptureMovement;
  }
}
