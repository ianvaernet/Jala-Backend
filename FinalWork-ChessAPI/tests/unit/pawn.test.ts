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
    expect(pawnOnInitialPosition.canMoveTo(new Position('A', 4))).toBe(true);
  });

  it('Should not move two steps forward if it is on initial position', () => {
    expect(pawn.canMoveTo(new Position('B', 6))).toBe(false);
  });

  it('Should move one step forward', () => {
    expect(pawn.canMoveTo(new Position('B', 5))).toBe(true);
  });

  it('Should not move to a side', () => {
    expect(pawn.canMoveTo(new Position('C', 4))).toBe(false);
  });

  it('Should not move in diagonal', () => {
    expect(pawn.canMoveTo(new Position('C', 5))).toBe(false);
  });

  it('Should not move back', () => {
    expect(pawn.canMoveTo(new Position('B', 3))).toBe(false);
  });
});

describe('Test pawn collisions', () => {
  let pawn: Pawn;
  let board: Board;
  beforeEach(() => {
    pawn = new Pawn('White', new Position('E', 2));
    const whitePawn = new Pawn('White', new Position('E', 3));
    const blackPawn = new Pawn('Black', new Position('F', 3));
    board = new Board([pawn, whitePawn, blackPawn]);
    pawn.setBoard(board);
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should not move when there is a piece before the destination', () => {
    const position = new Position('E', 4);
    expect(pawn.canMoveTo(position)).toBe(false);
  });

  it('Should not move when there is a piece forward', () => {
    const position = new Position('E', 3);
    expect(pawn.canMoveTo(position)).toBe(false);
  });

  it('Should capture when there is an opponent piece in diagonal', () => {
    const position = new Position('F', 3);
    expect(pawn.canMoveTo(position)).toBe(true);
  });
});
