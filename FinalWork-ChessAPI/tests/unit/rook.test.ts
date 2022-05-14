import { Board } from '../../src/board';
import { Rook } from '../../src/piece';
import { Position } from '../../src/position';

describe('Test rook movement', () => {
  let rook: Rook;
  beforeEach(() => {
    rook = new Rook('White', new Position('H', 1));
    rook.setBoard(new Board([rook]));
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should move one step forward', () => {
    expect(rook.canMove(new Position('H', 2))).toBe(true);
  });

  it('Should move three steps forward', () => {
    expect(rook.canMove(new Position('H', 4))).toBe(true);
  });

  it('Should move two steps aside', () => {
    expect(rook.canMove(new Position('F', 1))).toBe(true);
  });

  it('Should move four steps aside', () => {
    expect(rook.canMove(new Position('D', 1))).toBe(true);
  });

  it('Should not move in diagonal', () => {
    expect(rook.canMove(new Position('G', 2))).toBe(false);
  });

  it('Should not move in L', () => {
    expect(rook.canMove(new Position('G', 3))).toBe(false);
  });
});
