import { inject, injectable } from 'inversify';
import { IPieceService, Piece } from '../../piece';
import { DI } from '../../types';
import { Board, IBoardService } from '../core';

@injectable()
export class BoardService implements IBoardService {
  @inject(DI.IPieceService) private pieceService: IPieceService;

  async saveBoard(board: Board) {
    const oldPieces = await this.pieceService.getRemainingPieces();
    const pieces = board.getPieces();
    const piecesToDelete = oldPieces.filter(
      (oldPiece) => !pieces.find((piece) => piece.getId() === oldPiece.getId())
    );
    const piecesToSave = pieces.filter((piece) => {
      const oldPiece = oldPieces.find((oldPiece) => oldPiece.getId() === piece.getId());
      const pieceIsNew = !oldPiece;
      const pieceWasUpdated = oldPiece && !oldPiece.equals(piece);
      return pieceIsNew || pieceWasUpdated;
    });
    return Promise.all([
      ...piecesToSave.map((piece) => this.pieceService.savePiece(piece)),
      ...piecesToDelete.map((piece) => this.pieceService.deletePieceById(piece.getId())),
    ]);
  }
}
