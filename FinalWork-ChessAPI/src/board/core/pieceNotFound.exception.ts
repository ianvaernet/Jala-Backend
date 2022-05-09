import { NotFoundException } from '../../shared';

export class PieceNotFoundException extends NotFoundException {
  constructor() {
    super('Piece not found', 'There is no piece in the given position');
  }
}
