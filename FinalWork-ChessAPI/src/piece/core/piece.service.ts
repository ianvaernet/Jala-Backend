import { Piece } from './piece';

export interface IPieceService {
  getRemainingPieces(): Promise<Piece[]>;
  savePiece(piece: Piece): Promise<void>;
  deletePieceById(id: number): Promise<any>;
}
