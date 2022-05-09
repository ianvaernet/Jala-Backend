import { PieceDTO } from '../../piece';
import { File, Rank } from '../core';

export class PositionResponseDTO {
  file: File;
  rank: Rank;
  occupiedBy: PieceDTO | null;
}
