import { BadRequestException } from '../../shared';

export class NotYourTurnException extends BadRequestException {
  constructor() {
    super('It is not your turn');
  }
}
