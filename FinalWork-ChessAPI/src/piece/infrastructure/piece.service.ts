import { inject, injectable } from 'inversify';
import { DI } from '../../types';
import { IPieceRepository, IPieceService, Piece } from '../core';

@injectable()
export class PieceService implements IPieceService {
  @inject(DI.IPieceRepository) private pieceRepository: IPieceRepository;

  async savePiece(piece: Piece) {
    await this.pieceRepository.save(piece);
  }
}
