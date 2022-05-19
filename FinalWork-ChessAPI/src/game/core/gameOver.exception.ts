import { Color } from '../../piece';
import { BadRequestException } from '../../shared';

export class GameOverException extends BadRequestException {
  constructor(winner: Color) {
    super(`Game is over: ${winner} did a checkmate`, 'Please start a new game');
  }
}
