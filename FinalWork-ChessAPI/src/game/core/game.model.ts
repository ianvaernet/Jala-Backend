import { Board } from '../../board';
import { Color, Piece } from '../../piece';
import { Position } from '../../position';

export enum GameStatus {
  Ready = 'Ready to Start',
  Playing = 'Playing',
  Checkmate = 'Checkmate',
}

export class Game {
  private id: number;
  // private status: GameStatus;
  // private board: Board;
  // private turn: Color;

  constructor(private status: GameStatus, private board: Board, private turn: Color) {}

  getId() {
    return this.id;
  }
  setId(id: number): void {
    this.id = id;
  }

  getStatus() {
    return this.status;
  }

  getBoard() {
    return this.board;
  }

  getTurn() {
    return this.turn;
  }

  makeMove(piece: Piece, position: Position): void {
    1 + 2;
  }

  checkVictoryCondition(): void {
    1 + 2;
  }
}
