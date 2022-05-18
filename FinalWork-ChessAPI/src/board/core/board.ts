import { Game } from '../../game';
import { Bishop, Color, King, Knight, Pawn, Piece, Queen, Rook } from '../../piece';
import { File, FileNumber, Position, Rank } from '../../position';
import { PieceNotFoundException } from './pieceNotFound.exception';

export class Board {
  private grid: Position[];
  private game: Game;
  constructor(pieces: Piece[]) {
    const grid: Position[] = [];
    for (let rank: Rank = 1; rank < 9; rank++) {
      for (let file: FileNumber = 0; file < 8; file++) {
        grid.push(new Position(file as FileNumber, rank as Rank));
      }
    }
    pieces.forEach((piece) => {
      piece.setBoard(this);
      grid[(piece.getPosition().getRank() - 1) * 8 + piece.getPosition().getFileAsNumber()] = piece.getPosition();
    });
    this.grid = grid;
  }

  static initiateBoard() {
    const pieces: Piece[] = [];
    const colors: Color[] = ['White', 'Black'];
    const colorRanks = { White: [1, 2] as Rank[], Black: [8, 7] as Rank[] };
    const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as File[];
    colors.forEach((color) => {
      pieces.push(new Rook(color, new Position('A', colorRanks[color][0])));
      pieces.push(new Knight(color, new Position('B', colorRanks[color][0])));
      pieces.push(new Bishop(color, new Position('C', colorRanks[color][0])));
      pieces.push(new Queen(color, new Position('D', colorRanks[color][0])));
      pieces.push(new King(color, new Position('E', colorRanks[color][0])));
      pieces.push(new Bishop(color, new Position('F', colorRanks[color][0])));
      pieces.push(new Knight(color, new Position('G', colorRanks[color][0])));
      pieces.push(new Rook(color, new Position('H', colorRanks[color][0])));
      files.forEach((file) => {
        pieces.push(new Pawn(color, new Position(file, colorRanks[color][1])));
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
      if (opponentPiece.canMove(piece.getPosition())) threateningPieces.push(opponentPiece);
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
