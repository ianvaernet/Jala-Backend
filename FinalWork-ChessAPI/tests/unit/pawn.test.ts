import { Board } from '../../src/board';
import { Pawn } from '../../src/piece';
import { Position } from '../../src/position';

describe('Test pawn movement', () => {
  let pawn: Pawn;
  let pawnOnInitialPosition: Pawn;
  beforeEach(() => {
    pawn = new Pawn('White', new Position('B', 4));
    pawn.setBoard(new Board([pawn]));
    pawnOnInitialPosition = new Pawn('White', new Position('A', 2));
    pawnOnInitialPosition.setBoard(new Board([pawnOnInitialPosition]));
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should move two steps forward if it is on initial position', () => {
    expect(pawnOnInitialPosition.canMove(new Position('A', 4))).toBe(true);
  });

  it('Should not move two steps forward if it is on initial position', () => {
    expect(pawn.canMove(new Position('B', 6))).toBe(false);
  });

  it('Should move one step forward', () => {
    expect(pawn.canMove(new Position('B', 5))).toBe(true);
  });

  it('Should not move to a side', () => {
    expect(pawn.canMove(new Position('C', 4))).toBe(false);
  });

  it('Should not move in diagonal', () => {
    expect(pawn.canMove(new Position('C', 5))).toBe(false);
  });

  it('Should not move back', () => {
    expect(pawn.canMove(new Position('B', 3))).toBe(false);
  });
});
