import { Piece } from './piece';
import { Position } from '../../position';

export class Pawn extends Piece {
  canMoveTo(position: Position): boolean {
    if (!super.canMoveTo(position)) return false;
    const isInInitialPosition =
      (this.getColor() === 'White' && this.position.getRank() == 2) ||
      (this.getColor() === 'Black' && this.position.getRank() == 7);
    const forwardValue = this.getColor() === 'White' ? 1 : -1;
    const oneStepForward = this.position.getRank() + forwardValue === position.getRank();
    const twoStepsForward = this.position.getRank() + forwardValue * 2 === position.getRank();
    const oneStepAside = Math.abs(this.position.getFileAsNumber() - position.getFileAsNumber()) === 1;
    const thereIsAnOpponentPieceInDestination =
      this.getBoard().getPieceInPosition(position) !== null &&
      (this.getBoard().getPieceInPosition(position) as Piece).getColor() !== this.getColor();

    const isPawnMovement =
      this.position.getFile() === position.getFile() &&
      !thereIsAnOpponentPieceInDestination &&
      (oneStepForward || (isInInitialPosition && twoStepsForward && !this.thereIsAPieceBefore(position)));
    const isPawnCaptureMovement = oneStepForward && oneStepAside && thereIsAnOpponentPieceInDestination;
    return isPawnMovement || isPawnCaptureMovement;
  }

  clone() {
    return new Pawn(this.color, this.position.clone());
  }
}
