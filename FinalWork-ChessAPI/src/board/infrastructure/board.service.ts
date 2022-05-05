import { inject, injectable } from 'inversify';
import { Color, IPieceService, King, Piece } from '../../piece';
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
      let position = grid[colorRanks[color][0] * 8 + 5];
      const king = new King(color, position);
      position.setOccupiedBy(king);
    });
    const board = new Board(grid);
    // grid.forEach((position) => {
    //   if (position.getOccupiedBy() != undefined) {position.getOccupiedBy().setBoard(board)};
    // });
    return board;
  }

  saveBoard(board: Board) {
    const pieces = board
      .getGrid()
      .filter((position) => position.getOccupiedBy() !== null)
      .map((position) => position.getOccupiedBy()) as Piece[];
    // pieces.forEach((piece) => piece.setBoard(board));
    return Promise.all(pieces.map((piece) => this.pieceService.savePiece(piece)));
  }
}
