import { Piece } from './piece';

export interface IPieceService {
  savePiece(piece: Piece): Promise<void>;
}
