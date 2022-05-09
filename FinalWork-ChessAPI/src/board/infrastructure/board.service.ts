import { inject, injectable } from 'inversify';
import { IPieceService, Piece } from '../../piece';
import { DI } from '../../types';
import { Board, IBoardService } from '../core';

@injectable()
export class BoardService implements IBoardService {
  @inject(DI.IPieceService) private pieceService: IPieceService;

  saveBoard(board: Board) {
    const pieces = board
      .getGrid()
      .filter((position) => position.getOccupiedBy())
      .map((position) => position.getOccupiedBy());
    return Promise.all(pieces.map((piece) => this.pieceService.savePiece(piece as Piece)));
  }
}
