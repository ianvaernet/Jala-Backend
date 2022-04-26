import Piece from './piece';
import Position from './position';

export default class Queen extends Piece {
  canMove(position: Position): boolean {
    const samePosition = position.getFile() === this.position.getFile() && position.getRank() === this.position.getRank();
    const rook = position.getFile() === this.position.getFile() || position.getRank() === this.position.getRank();
    const bishop =
      Math.abs(this.position.getRank() - position.getRank()) ===
      Math.abs(this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0));
    return !samePosition && (rook || bishop);
  }
}
