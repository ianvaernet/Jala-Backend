import Piece from './piece';
import Position from './position';

export default class King extends Piece {
  canMove(position: Position): boolean {
    if (position.getFile() === this.position.getFile() && position.getRank() === this.position.getRank()) return false;
    return (
      Math.abs(this.position.getRank() - position.getRank()) <= 1 &&
      Math.abs(this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0)) <= 1
    );
  }
}
