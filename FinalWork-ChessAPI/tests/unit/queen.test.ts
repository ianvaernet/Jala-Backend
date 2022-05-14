import { Position } from '../../src/position';
import { Queen } from '../../src/piece';
import { Board } from '../../src/board';

describe('Test queen movement', () => {
  let queen: Queen;
  beforeEach(() => {
    queen = new Queen('White', new Position('D', 1));
    queen.setBoard(new Board([queen]));
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should move vertically', () => {
    const position = new Position('D', 8);
    expect(queen.canMove(position)).toBe(true);
  });

  it('Should move horizontally', () => {
    const position = new Position('A', 1);
    expect(queen.canMove(position)).toBe(true);
  });

  it('Should move diagonally', () => {
    let position = new Position('H', 5);
    expect(queen.canMove(position)).toBe(true);

    position = new Position('A', 4);
    expect(queen.canMove(position)).toBe(true);
  });

  it('Should not move L', () => {
    let position = new Position('C', 3);
    expect(queen.canMove(position)).toBe(false);

    position = new Position('E', 3);
    expect(queen.canMove(position)).toBe(false);
  });

  it('Should not move other places', () => {
    let position = new Position('C', 5);
    expect(queen.canMove(position)).toBe(false);

    position = new Position('F', 8);
    expect(queen.canMove(position)).toBe(false);
  });
});
