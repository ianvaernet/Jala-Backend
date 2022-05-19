import { CheckmateMoveException, Game, GameOverException, GameStatus } from '../../src/game';
import { Position } from '../../src/position';

let game: Game;
beforeEach(() => {
  game = Game.startNewGame();
});
afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
});

describe('Test check is handled properly', () => {
  it('Should not allow to move the king into check', () => {
    game.move('White', new Position('E', 2), new Position('E', 4));
    game.move('Black', new Position('D', 7), new Position('D', 5));
    game.move('White', new Position('D', 1), new Position('G', 4));
    expect(() => game.move('Black', new Position('E', 8), new Position('D', 7))).toThrow(
      CheckmateMoveException
    );
  });

  it('Should not allow to move a piece that is covering the king from check', () => {
    game.move('White', new Position('E', 2), new Position('E', 3));
    game.move('Black', new Position('H', 7), new Position('H', 6));
    game.move('White', new Position('F', 1), new Position('B', 5));
    expect(() => game.move('Black', new Position('D', 7), new Position('D', 5))).toThrow(
      CheckmateMoveException
    );
  });

  it('Should not allow to move other piece when the king is under check', () => {
    game.move('White', new Position('E', 2), new Position('E', 3));
    game.move('Black', new Position('D', 7), new Position('D', 5));
    game.move('White', new Position('F', 1), new Position('B', 5));
    expect(() => game.move('Black', new Position('B', 7), new Position('B', 6))).toThrow(
      CheckmateMoveException
    );
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
    game.move('Black', new Position('E', 7), new Position('F', 6));
  });

  it('Should allow to move other piece to cover the king from check', () => {
    game.move('White', new Position('E', 2), new Position('E', 3));
    game.move('Black', new Position('D', 7), new Position('D', 5));
    game.move('White', new Position('F', 1), new Position('B', 5));
    game.move('Black', new Position('D', 8), new Position('D', 7));
  });

  it('Should not allow to move the king to a position threatened by a knight', () => {
    game.move('White', new Position('G', 1), new Position('F', 3));
    game.move('Black', new Position('F', 7), new Position('F', 5));
    game.move('White', new Position('F', 3), new Position('G', 5));
    expect(() => game.move('Black', new Position('E', 8), new Position('F', 7))).toThrow(
      CheckmateMoveException
    );
  });
});

describe('Test checkmate is handled properly', () => {
  it("Should do the Fool's Mate", () => {
    game.move('White', new Position('G', 2), new Position('G', 4));
    game.move('Black', new Position('E', 7), new Position('E', 5));
    game.move('White', new Position('F', 2), new Position('F', 3));
    game.move('Black', new Position('D', 8), new Position('H', 4));
    expect(game.getStatus()).toBe(GameStatus.Checkmate);
    expect(() => game.move('White', new Position('A', 2), new Position('A', 3))).toThrow(GameOverException);
  });

  it('Should do the Smothered Checkmate', () => {
    game.move('White', new Position('E', 2), new Position('E', 4));
    game.move('Black', new Position('E', 7), new Position('E', 5));
    game.move('White', new Position('G', 1), new Position('E', 2));
    game.move('Black', new Position('B', 8), new Position('C', 6));
    game.move('White', new Position('B', 1), new Position('C', 3));
    game.move('Black', new Position('C', 6), new Position('D', 4));
    game.move('White', new Position('G', 2), new Position('G', 3));
    game.move('Black', new Position('D', 4), new Position('F', 3));
    expect(game.getStatus()).toBe(GameStatus.Checkmate);
  });

  it("Should do the Scholar's Mate", () => {
    game.move('White', new Position('E', 2), new Position('E', 4));
    game.move('Black', new Position('E', 7), new Position('E', 5));
    game.move('White', new Position('F', 1), new Position('C', 4));
    game.move('Black', new Position('F', 8), new Position('C', 5));
    game.move('White', new Position('D', 1), new Position('H', 5));
    game.move('Black', new Position('G', 8), new Position('F', 6));
    game.move('White', new Position('H', 5), new Position('F', 7));
    expect(game.getStatus()).toBe(GameStatus.Checkmate);
  });

  it('Should do the Hippopotamus Mate', () => {
    game.move('White', new Position('E', 2), new Position('E', 4));
    game.move('Black', new Position('E', 7), new Position('E', 5));
    game.move('White', new Position('G', 1), new Position('E', 2));
    game.move('Black', new Position('D', 8), new Position('H', 4));
    game.move('White', new Position('B', 1), new Position('C', 3));
    game.move('Black', new Position('B', 8), new Position('C', 6));
    game.move('White', new Position('G', 2), new Position('G', 3));
    game.move('Black', new Position('H', 4), new Position('G', 5));
    game.move('White', new Position('D', 2), new Position('D', 4));
    game.move('Black', new Position('C', 6), new Position('D', 4));
    game.move('White', new Position('C', 1), new Position('G', 5));
    game.move('Black', new Position('D', 4), new Position('F', 3));
    expect(game.getStatus()).toBe(GameStatus.Checkmate);
  });

  it("Should do the Legal's Mate", () => {
    game.move('White', new Position('E', 2), new Position('E', 4));
    game.move('Black', new Position('E', 7), new Position('E', 5));
    game.move('White', new Position('F', 1), new Position('C', 4));
    game.move('Black', new Position('D', 7), new Position('D', 6));
    game.move('White', new Position('G', 1), new Position('F', 3));
    game.move('Black', new Position('C', 8), new Position('G', 4));
    game.move('White', new Position('B', 1), new Position('C', 3));
    game.move('Black', new Position('G', 7), new Position('G', 6));
    game.move('White', new Position('F', 3), new Position('E', 5));
    game.move('Black', new Position('G', 4), new Position('D', 1));
    game.move('White', new Position('C', 4), new Position('F', 7));
    game.move('Black', new Position('E', 8), new Position('E', 7));
    game.move('White', new Position('C', 3), new Position('D', 5));
    expect(game.getStatus()).toBe(GameStatus.Checkmate);
  });
});
