import { Game } from '../../game';
import { Bishop, Color, King, Knight, Pawn, Piece, Queen, Rook } from '../../piece';
import { File, FileNumber, Position, Rank } from '../../position';
import { PieceNotFoundException } from './pieceNotFound.exception';

export class Board {
  private grid: Position[];
  private game: Game;

  constructor(pieces: Piece[]) {
    const grid: Position[] = [];
    const MIN_RANK: Rank = 1;
    const MAX_RANK: Rank = 8;
    const MIN_FILE: FileNumber = 0;
    const MAX_FILE: FileNumber = 7;
    for (let rank = MIN_RANK; rank <= MAX_RANK; rank++) {
      for (let file = MIN_FILE; file <= MAX_FILE; file++) {
        grid.push(new Position(file, rank));
      }
    }
    const FILES_PER_RANK = 8;
    pieces.forEach((piece) => {
      piece.setBoard(this);
      const positionIndexInGrid =
        (piece.getPosition().getRank() - 1) * FILES_PER_RANK + piece.getPosition().getFileAsNumber();
      grid[positionIndexInGrid] = piece.getPosition();
    });
    this.grid = grid;
  }

  static initiateBoard() {
    const pieces: Piece[] = [];
    const colors: Color[] = ['White', 'Black'];
    const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as File[];
    const specialPiecesRank = { White: 1 as Rank, Black: 8 as Rank };
    const pawnsRank = { White: 2 as Rank, Black: 7 as Rank };
    colors.forEach((color) => {
      pieces.push(new Rook(color, new Position('A', specialPiecesRank[color])));
      pieces.push(new Knight(color, new Position('B', specialPiecesRank[color])));
      pieces.push(new Bishop(color, new Position('C', specialPiecesRank[color])));
      pieces.push(new Queen(color, new Position('D', specialPiecesRank[color])));
      pieces.push(new King(color, new Position('E', specialPiecesRank[color])));
      pieces.push(new Bishop(color, new Position('F', specialPiecesRank[color])));
      pieces.push(new Knight(color, new Position('G', specialPiecesRank[color])));
      pieces.push(new Rook(color, new Position('H', specialPiecesRank[color])));
      files.forEach((file) => {
        pieces.push(new Pawn(color, new Position(file, pawnsRank[color])));
      });
    });
    return new Board(pieces);
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

  getPieces(color?: Color): Piece[] {
    let pieces = this.grid
      .filter((gridPosition) => gridPosition.getOccupiedBy())
      .map((gridPosition) => gridPosition.getOccupiedBy() as Piece);
    if (color) pieces = pieces.filter((piece) => piece.getColor() === color);
    return pieces;
  }
  getThreateningPieces(piece: Piece): Piece[] {
    const threateningPieces: Piece[] = [];
    const opponentPieces = this.getPieces(piece.getColor() === 'White' ? 'Black' : 'White');
    opponentPieces.forEach((opponentPiece) => {
      if (opponentPiece.canMoveTo(piece.getPosition())) threateningPieces.push(opponentPiece);
    });
    return threateningPieces;
  }
  getKing(color: Color): King {
    return this.getPieces(color).find((piece) => piece.constructor.name === 'King') as King;
  }

  getGridPosition(position: Position) {
    return this.grid.find((gridPosition) => gridPosition.equals(position)) as Position;
  }

  getPieceInPosition(position: Position): Piece | null {
    const piece = this.getGridPosition(position)?.getOccupiedBy();
    return piece ?? null;
  }

  move(from: Position, to: Position): void {
    const piece = this.getPieceInPosition(from);
    if (!piece) throw new PieceNotFoundException();
    piece.moveTo(this.getGridPosition(to));
  }
}
