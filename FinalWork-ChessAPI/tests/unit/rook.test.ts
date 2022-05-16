import { Board } from '../../src/board';
import { Pawn, Rook } from '../../src/piece';
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

describe('Test rook collisions', () => {
  let rook: Rook;
  let board: Board;
  beforeEach(() => {
    rook = new Rook('White', new Position('A', 1));
    const whitePawn = new Pawn('White', new Position('A', 4));
    const blackPawn = new Pawn('Black', new Position('D', 1));
    board = new Board([rook, whitePawn, blackPawn]);
    rook.setBoard(board);
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should not move when there is a piece before the destination', () => {
    const position = new Position('F', 1);
    expect(rook.canMove(position)).toBe(false);
  });

  it('Should not move when there is an own piece in the destination', () => {
    const position = new Position('A', 4);
    expect(rook.canMove(position)).toBe(false);
  });

  it('Should capture when there is an opponent piece in the destination', () => {
    const position = new Position('D', 1);
    expect(rook.canMove(position)).toBe(true);
  });
});
