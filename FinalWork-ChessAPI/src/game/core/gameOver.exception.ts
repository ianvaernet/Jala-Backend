import { BadRequestException } from '../../shared';

export class GameOverException extends BadRequestException {
  constructor() {
    super('Game is over', 'Please start a new game');
  }
}
