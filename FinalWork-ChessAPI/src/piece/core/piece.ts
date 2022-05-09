import { Board } from '../../board';
import { Position } from '../../position';
import { InvalidMoveException } from './invalidMove.exception';

export type Color = 'Black' | 'White';

export abstract class Piece {
  private id: number;
  private board: Board;
  constructor(private readonly color: Color, protected position: Position) {}

  canMove(position: Position): boolean {
    const samePosition = position.getFile() === this.position.getFile() && position.getRank() === this.position.getRank();
    return !samePosition;
  }

  moveTo(position: Position) {
    if (!this.canMove(position)) throw new InvalidMoveException();
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
}
