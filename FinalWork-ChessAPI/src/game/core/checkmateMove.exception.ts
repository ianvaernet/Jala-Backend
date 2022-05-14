import { BadRequestException } from '../../shared';

export class CheckmateMoveException extends BadRequestException {
  constructor() {
    super('You cannot move into checkmate.');
  }
}
