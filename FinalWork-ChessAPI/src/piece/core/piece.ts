import { Board } from '../../board';
import { FileNumber, Position, Rank } from '../../position';
import { InvalidMoveException } from './invalidMove.exception';

export type Color = 'Black' | 'White';

export abstract class Piece {
  private id: number;
  private board: Board;
  constructor(private readonly color: Color, protected position: Position) {
    position.setOccupiedBy(this);
  }

  canMove(position: Position): boolean {
    const samePosition = position.getFile() === this.position.getFile() && position.getRank() === this.position.getRank();
    const pieceInDestination = this.getBoard().getPieceInPosition(position);
    return !samePosition && (!pieceInDestination || pieceInDestination.getColor() !== this.getColor());
  }

  moveTo(position: Position) {
    if (!this.canMove(position)) throw new InvalidMoveException();
    this.position.setOccupiedBy(null);
    this.position = position;
    this.position.setOccupiedBy(this);
  }

  getColor(): Color {
    return this.color;
  }

  getPosition(): Position {
    return this.position;
  }

  getId(): number {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }

  getBoard(): Board {
    return this.board;
  }
  setBoard(board: Board) {
    this.board = board;
  }

  equals(other: Piece): boolean {
    return this.id === other.id && this.color === other.color && this.position.equals(other.position);
  }

  private getMovementDifferential(movement: number) {
    return movement === 0 ? 0 : movement > 0 ? 1 : -1;
  }

  protected thereIsAPieceBefore(position: Position): boolean {
    const verticalMovement = position.getRank() - this.position.getRank();
    const verticalDifferential = this.getMovementDifferential(verticalMovement);
    const horizontalMovement = position.getFileAsNumber() - this.position.getFileAsNumber();
    const horizontalDifferential = this.getMovementDifferential(horizontalMovement);
    const graterMovement = Math.max(Math.abs(verticalMovement), Math.abs(horizontalMovement));
    for (let i = 1; i < graterMovement; i++) {
      const positionInMiddle = new Position(
        (this.position.getFileAsNumber() + i * horizontalDifferential) as FileNumber,
        (this.position.getRank() + i * verticalDifferential) as Rank
      );
      if (this.getBoard().getPieceInPosition(positionInMiddle)) return true;
    }
    return false;
  }
}
