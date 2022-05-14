import { CheckmateMoveException, Game } from '../../src/game';
import { Position } from '../../src/position';

describe('Test check is handled properly', () => {
  let game: Game;
  beforeEach(() => {
    game = Game.startNewGame();
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should not allow to move the king into check', () => {
    game.move('White', new Position('E', 2), new Position('E', 4));
    game.move('Black', new Position('D', 7), new Position('D', 5));
    game.move('White', new Position('D', 1), new Position('G', 4));
    expect(() => game.move('Black', new Position('E', 8), new Position('D', 7))).toThrow(CheckmateMoveException);
  });

  it('Should not allow to move a piece that is covering the king from check', () => {
    game.move('White', new Position('E', 2), new Position('E', 3));
    game.move('Black', new Position('H', 7), new Position('H', 6));
    game.move('White', new Position('F', 1), new Position('B', 5));
    expect(() => game.move('Black', new Position('D', 7), new Position('D', 5))).toThrow(CheckmateMoveException);
  });

  it('Should not allow to move other piece when the king is under check', () => {
    game.move('White', new Position('E', 2), new Position('E', 3));
    game.move('Black', new Position('D', 7), new Position('D', 5));
    game.move('White', new Position('F', 1), new Position('B', 5));
    expect(() => game.move('Black', new Position('B', 7), new Position('B', 6))).toThrow(CheckmateMoveException);
  });

  it('Should allow to move the king to a safe position when it is under check', () => {
    game.move('White', new Position('B', 1), new Position('C', 3));
    game.move('Black', new Position('A', 7), new Position('A', 6));
    game.move('White', new Position('C', 3), new Position('D', 5));
    game.move('Black', new Position('F', 7), new Position('F', 6));
    game.move('White', new Position('D', 5), new Position('F', 6));
    game.move('Black', new Position('E', 8), new Position('F', 7));
  });

  it('Should allow to move other piece when the king is under check if it captures the threating piece', () => {
    game.move('White', new Position('B', 1), new Position('C', 3));
    game.move('Black', new Position('A', 7), new Position('A', 6));
    game.move('White', new Position('C', 3), new Position('D', 5));
    game.move('Black', new Position('A', 6), new Position('A', 5));
    game.move('White', new Position('D', 5), new Position('F', 6));
    game.move('Black', new Position('F', 7), new Position('F', 6));
  });

  it('Should allow to move other piece to cover the king from check', () => {
    game.move('White', new Position('E', 2), new Position('E', 3));
    game.move('Black', new Position('D', 7), new Position('D', 5));
    game.move('White', new Position('F', 1), new Position('B', 5));
    game.move('Black', new Position('D', 8), new Position('D', 7));
  });
});
