import { Board } from '../../board';
import { Color, King } from '../../piece';
import { Position } from '../../position';
import { CheckmateMoveException } from './checkmateMoveException';
import { GameOverException } from './gameOver.exception';
import { NotYourPieceException } from './notYourPiece.exception';
import { NotYourTurnException } from './notYourTurn.exception';

export enum GameStatus {
  Ready = 'Ready to Start',
  Playing = 'Playing',
  Checkmate = 'Checkmate',
}

export class Game {
  private id: number;

  constructor(private board: Board, private status: GameStatus, private turn: Color) {
    board.setGame(this);
  }

  static startNewGame() {
    return new Game(Board.initiateBoard(), GameStatus.Ready, 'White');
  }

  getId() {
    return this.id;
  }
  setId(id: number): void {
    this.id = id;
  }

  getStatus() {
    return this.status;
  }
  private setStatus(status: GameStatus) {
    this.status = status;
  }

  getBoard() {
    return this.board;
  }

  getTurn() {
    return this.turn;
  }

  move(color: Color, from: Position, to: Position): void {
    if (this.status === GameStatus.Checkmate) throw new GameOverException();
    if (this.status === GameStatus.Ready) this.setStatus(GameStatus.Playing);
    if (this.turn !== color) throw new NotYourTurnException();
    if (this.board.getPieceInPosition(from).getColor() !== color) throw new NotYourPieceException();
    this.board.move(from, to);
    if (this.isCheckTo(this.turn)) throw new CheckmateMoveException();
    this.turn = this.turn === 'White' ? 'Black' : 'White';
    if (this.isCheckMate()) this.setStatus(GameStatus.Checkmate);
  }

  isCheckTo(color: Color): boolean {
    let isCheck = false;
    const allPieces = this.board.getPieces();
    const king = allPieces.find((piece) => piece.getColor() === color && piece.constructor.name === 'King') as King;
    const opponentPieces = allPieces.filter((piece) => piece.getColor() !== color);
    opponentPieces.forEach((opponentPiece) => {
      if (opponentPiece.canMove(king.getPosition())) isCheck = true;
    });
    return isCheck;
  }

  isCheckMate(): boolean {
    const isThereAnyMove = false;
    return this.isCheckTo(this.turn) && !isThereAnyMove;
  }
}
