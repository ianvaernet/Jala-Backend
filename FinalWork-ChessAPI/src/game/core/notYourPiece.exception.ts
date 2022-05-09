import { BadRequestException } from '../../shared';

export class NotYourPieceException extends BadRequestException {
  constructor() {
    super('Not your piece', 'You cannot move pieces of another player');
  }
}
