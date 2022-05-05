import { inject, injectable } from 'inversify';
import { Bishop, Color, IPieceService, King, Knight, Pawn, Queen, Rook } from '../../piece';
import { FileNumber, Position, Rank } from '../../position';
import { DI } from '../../types';
import { Board, IBoardService } from '../core';

@injectable()
export class BoardService implements IBoardService {
  @inject(DI.IPieceService) private pieceService: IPieceService;

  initiateBoard() {
    const grid: Position[] = [];
    for (let rank: Rank = 1; rank < 9; rank++) {
      for (let file: FileNumber = 0; file < 8; file++) {
        grid.push(new Position(file as FileNumber, rank as Rank));
      }
    }
    const colors: Color[] = ['White', 'Black'];
    const colorRanks = { White: [0, 1], Black: [7, 6] };
    colors.forEach((color) => {
      let position = grid[colorRanks[color][0] * 8];
      position.setOccupiedBy(new Rook(color, position));
      position = grid[colorRanks[color][0] * 8 + 1];
      position.setOccupiedBy(new Knight(color, position));
      position = grid[colorRanks[color][0] * 8 + 2];
      position.setOccupiedBy(new Bishop(color, position));
      position = grid[colorRanks[color][0] * 8 + 3];
      position.setOccupiedBy(new Queen(color, position));
      position = grid[colorRanks[color][0] * 8 + 4];
      position.setOccupiedBy(new King(color, position));
      position = grid[colorRanks[color][0] * 8 + 5];
      position.setOccupiedBy(new Bishop(color, position));
      position = grid[colorRanks[color][0] * 8 + 6];
      position.setOccupiedBy(new Knight(color, position));
      position = grid[colorRanks[color][0] * 8 + 7];
      position.setOccupiedBy(new Rook(color, position));
      for (let file: FileNumber = 0; file < 8; file++) {
        position = grid[colorRanks[color][1] * 8 + file];
        position.setOccupiedBy(new Pawn(color, position));
      }
    });
    const board = new Board(grid);
    return board;
  }

  saveBoard(board: Board) {
    const pieces = board
      .getGrid()
      .filter((position) => position.getOccupiedBy())
      .map((position) => position.getOccupiedBy());
    return Promise.all(pieces.map((piece) => this.pieceService.savePiece(piece)));
  }
}
