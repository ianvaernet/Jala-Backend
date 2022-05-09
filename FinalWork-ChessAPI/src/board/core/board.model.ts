import { Game } from '../../game';
import { Piece } from '../../piece';
import { Position } from '../../position';
import { PieceNotFoundException } from './pieceNotFound.exception';

export class Board {
  private game: Game;
  constructor(private grid: Position[]) {
    grid.forEach((position) => {
      if (position.getOccupiedBy()) position.getOccupiedBy().setBoard(this);
    });
  }

  getGrid(): Position[] {
    return this.grid;
  }

  getGame() {
    return this.game;
  }
  setGame(game: Game) {
    this.game = game;
  }

  getPieceInPosition(position: Position): Piece {
    const piece = this.grid.find((gridPosition) => gridPosition.equals(position))?.getOccupiedBy();
    if (!piece) throw new PieceNotFoundException();
    return piece;
  }

  move(from: Position, to: Position): void {
    const piece = this.getPieceInPosition(from);
    piece.moveTo(to);
  }
}
