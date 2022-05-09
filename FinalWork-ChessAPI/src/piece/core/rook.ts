import { Piece } from './piece';
import { Position } from '../../position';

export class Rook extends Piece {
  canMove(position: Position): boolean {
    const differentPosition = super.canMove(position);
    const rookMovement = position.getFile() === this.position.getFile() || position.getRank() === this.position.getRank();
    return differentPosition && rookMovement;
  }
}
