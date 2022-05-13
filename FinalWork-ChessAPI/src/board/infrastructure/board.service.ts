import { inject, injectable } from 'inversify';
import { IPieceService, Piece } from '../../piece';
import { DI } from '../../types';
import { Board, IBoardService } from '../core';

@injectable()
export class BoardService implements IBoardService {
  @inject(DI.IPieceService) private pieceService: IPieceService;

  async saveBoard(board: Board) {
    const oldPieces = await this.pieceService.getRemainingPieces();
    const pieces = board
      .getGrid()
      .filter((position) => position.getOccupiedBy())
      .map((position) => position.getOccupiedBy()) as Piece[];
    const piecesToDelete = oldPieces.filter((oldPiece) => !pieces.find((piece) => piece.getId() === oldPiece.getId()));
    const piecesToSave = pieces.filter((newPiece) => {
      const oldPiece = oldPieces.find((oldPiece) => oldPiece.getId() === newPiece.getId());
      return !oldPiece || !oldPiece.equals(newPiece);
    });
    return Promise.all([
      ...piecesToSave.map((piece) => this.pieceService.savePiece(piece as Piece)),
      ...piecesToDelete.map((piece) => this.pieceService.deletePieceById(piece.getId())),
    ]);
  }
}
