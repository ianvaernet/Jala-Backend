import { Board, PieceNotFoundException } from '../../board';
import { Color, King, Piece } from '../../piece';
import { Position } from '../../position';
import { CheckmateMoveException } from './checkmateMove.exception';
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
  private passTurn() {
    this.turn = this.turn === 'White' ? 'Black' : 'White';
  }

  move(color: Color, from: Position, to: Position): void {
    if (this.status === GameStatus.Checkmate) throw new GameOverException();
    if (this.status === GameStatus.Ready) this.setStatus(GameStatus.Playing);
    if (this.turn !== color) throw new NotYourTurnException();
    const piece = this.board.getPieceInPosition(from);
    if (!piece) throw new PieceNotFoundException();
    if (piece.getColor() !== color) throw new NotYourPieceException();
    this.board.move(from, to);
    if (this.isCheckTo(this.turn)) throw new CheckmateMoveException();
    this.passTurn();
    if (this.isCheckMate()) this.setStatus(GameStatus.Checkmate);
  }

  private isCheckTo(color: Color): boolean {
    const king = this.board.getKing(color);
    const isCheck = this.board.getThreateningPieces(king).length > 0;
    return isCheck;
  }

  private isCheckAfterMove(from: Position, to: Position) {
    const simulatedGame = new Game(
      new Board(this.board.getPieces().map((piece) => piece.clone())),
      this.status,
      this.turn
    );
    simulatedGame.board.move(from, to);
    return simulatedGame.isCheckTo(this.turn);
  }

  private kingCanMoveOutOfCheck(): boolean {
    const king = this.board.getKing(this.turn);
    for (let position of king.getAvailableMovements()) {
      if (!this.isCheckAfterMove(king.getPosition(), position)) return true;
    }
    return false;
  }

  private pieceDoingCheckCanBeCaptured(): boolean {
    const king = this.board.getKing(this.turn);
    const threateningPieces = this.board.getThreateningPieces(king);
    if (threateningPieces.length > 1) return false;
    if (threateningPieces.length === 0) return true;
    const threateningPiece = threateningPieces[0];
    for (let ownPiece of this.board.getPieces(this.turn)) {
      if (
        ownPiece.canCapture(threateningPiece) &&
        !this.isCheckAfterMove(ownPiece.getPosition(), threateningPiece.getPosition())
      ) {
        return true;
      }
    }
    return false;
  }

  private kingCanBeCovered(): boolean {
    const king = this.board.getKing(this.turn);
    const pieceDoingCheck = this.board.getThreateningPieces(king)[0];
    const positionsToCover = pieceDoingCheck.getPositionsBefore(king.getPosition());
    const ownPieces = this.board.getPieces(this.turn).filter((piece) => !(piece instanceof King));
    for (let ownPiece of ownPieces) {
      for (let positionToCover of positionsToCover) {
        if (
          ownPiece.canMoveTo(positionToCover) &&
          !this.isCheckAfterMove(ownPiece.getPosition(), positionToCover)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private isCheckMate(): boolean {
    return (
      this.isCheckTo(this.turn) &&
      !this.kingCanMoveOutOfCheck() &&
      !this.pieceDoingCheckCanBeCaptured() &&
      !this.kingCanBeCovered()
    );
  }
}
