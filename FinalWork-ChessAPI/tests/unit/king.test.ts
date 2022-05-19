import { Board } from '../../src/board';
import { King, Pawn } from '../../src/piece';
import { Position } from '../../src/position';

describe('Test king movement', () => {
  let king: King;
  beforeEach(() => {
    king = new King('White', new Position('E', 2));
    king.setBoard(new Board([king]));
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should move one step forward', () => {
    expect(king.canMoveTo(new Position('E', 3))).toBe(true);
  });

  it('Should move one step forward-right', () => {
    expect(king.canMoveTo(new Position('F', 3))).toBe(true);
  });

  it('Should move one step right', () => {
    expect(king.canMoveTo(new Position('F', 2))).toBe(true);
  });

  it('Should move one step right-back', () => {
    expect(king.canMoveTo(new Position('F', 1))).toBe(true);
  });

  it('Should move one step back', () => {
    expect(king.canMoveTo(new Position('E', 1))).toBe(true);
  });

  it('Should move one step back-left', () => {
    expect(king.canMoveTo(new Position('D', 1))).toBe(true);
  });

  it('Should move one step left', () => {
    expect(king.canMoveTo(new Position('D', 2))).toBe(true);
  });

  it("Shouldn't move to the same position", () => {
    expect(king.canMoveTo(new Position('E', 2))).toBe(false);
  });

  it("Shouldn't move 2 steps", () => {
    expect(king.canMoveTo(new Position('E', 4))).toBe(false);
  });
});

describe('Test king collisions', () => {
  let king: King;
  let board: Board;
  beforeEach(() => {
    king = new King('White', new Position('D', 1));
    const whitePawn = new Pawn('White', new Position('C', 2));
    const blackPawn = new Pawn('Black', new Position('E', 1));
    board = new Board([king, whitePawn, blackPawn]);
    king.setBoard(board);
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should not move when there is an own piece in the destination', () => {
    const position = new Position('C', 2);
    expect(king.canMoveTo(position)).toBe(false);
  });

  it('Should capture when there is an opponent piece in the destination', () => {
    const position = new Position('E', 1);
    expect(king.canMoveTo(position)).toBe(true);
  });
});
