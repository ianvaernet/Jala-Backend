import { BadRequestException } from '../../shared';

export class InvalidMoveException extends BadRequestException {
  constructor() {
    super('Invalid move', 'The piece cannot move to the given position');
  }
}
