import { Board } from '../../board';
import { Position } from '../../position';

export type Color = 'Black' | 'White';

export abstract class Piece {
  private id: number;
  private board: Board;
  constructor(private readonly color: Color, protected position: Position) {}

  moveTo(position: Position) {
    this.position = position;
  }

  abstract canMove(position: Position): boolean;

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
