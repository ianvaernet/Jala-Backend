import { Piece } from './piece';

export interface IPieceRepository {
  getRemainingPieces(): Promise<Piece[]>;
  save(piece: Piece): Promise<void>;
}
