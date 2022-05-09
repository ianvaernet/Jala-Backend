import { Position } from '../../src/position';
import { Bishop } from '../../src/piece';

describe('Test bishop movement', () => {
  let bishop: Bishop;
  beforeEach(() => {
    bishop = new Bishop('White', new Position('E', 5));
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should move diagonally forward-left', () => {
    const position = new Position('D', 6);
    expect(bishop.canMove(position)).toBe(true);
  });

  it('Should move diagonally forward-right', () => {
    const position = new Position('G', 7);
    expect(bishop.canMove(position)).toBe(true);
  });

  it('Should move diagonally back-right', () => {
    const position = new Position('H', 2);
    expect(bishop.canMove(position)).toBe(true);
  });

  it('Should move diagonally back-left', () => {
    const position = new Position('A', 1);
    expect(bishop.canMove(position)).toBe(true);
  });

  it('Should not move horizontally', () => {
    let position = new Position('E', 3);
    expect(bishop.canMove(position)).toBe(false);
    position = new Position('E', 6);
    expect(bishop.canMove(position)).toBe(false);
  });

  it('Should not move in L', () => {
    let position = new Position('F', 7);
    expect(bishop.canMove(position)).toBe(false);
    position = new Position('C', 4);
    expect(bishop.canMove(position)).toBe(false);
  });
});
