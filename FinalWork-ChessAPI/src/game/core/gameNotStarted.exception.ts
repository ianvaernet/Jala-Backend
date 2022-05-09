import { NotFoundException } from '../../shared';

export class GameNotStartedException extends NotFoundException {
  constructor() {
    super('Game not started', 'Please start a game');
  }
}
