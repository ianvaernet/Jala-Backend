import { inject, injectable } from 'inversify';
import { DI } from '../../types';
import { IPieceRepository, IPieceService, Piece } from '../core';

@injectable()
export class PieceService implements IPieceService {
  @inject(DI.IPieceRepository) private pieceRepository: IPieceRepository;

  getRemainingPieces(): Promise<Piece[]> {
    return this.pieceRepository.getRemainingPieces();
  }

  savePiece(piece: Piece) {
    return this.pieceRepository.save(piece);
  }

  deletePieceById(id: number) {
    return this.pieceRepository.deletePieceById(id);
  }
}
