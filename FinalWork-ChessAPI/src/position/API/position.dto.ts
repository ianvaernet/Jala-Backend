import { PieceDTO } from '../../piece';
import { File, Rank } from '../core';

export class PositionDTO {
  file: File;
  rank: Rank;
  occupiedBy: PieceDTO | null;
}
