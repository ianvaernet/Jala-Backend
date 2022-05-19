import { Position } from '../../src/position';
import { Bishop, Pawn } from '../../src/piece';
import { Board } from '../../src/board';

describe('Test bishop movement', () => {
  let bishop: Bishop;
  beforeEach(() => {
    bishop = new Bishop('White', new Position('E', 5));
    bishop.setBoard(new Board([bishop]));
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should move diagonally forward-left', () => {
    const position = new Position('D', 6);
    expect(bishop.canMoveTo(position)).toBe(true);
  });

  it('Should move diagonally forward-right', () => {
    const position = new Position('G', 7);
    expect(bishop.canMoveTo(position)).toBe(true);
  });

  it('Should move diagonally back-right', () => {
    const position = new Position('H', 2);
    expect(bishop.canMoveTo(position)).toBe(true);
  });

  it('Should move diagonally back-left', () => {
    const position = new Position('A', 1);
    expect(bishop.canMoveTo(position)).toBe(true);
  });

  it('Should not move horizontally', () => {
    let position = new Position('E', 3);
    expect(bishop.canMoveTo(position)).toBe(false);
    position = new Position('E', 6);
    expect(bishop.canMoveTo(position)).toBe(false);
  });

  it('Should not move in L', () => {
    let position = new Position('F', 7);
    expect(bishop.canMoveTo(position)).toBe(false);
    position = new Position('C', 4);
    expect(bishop.canMoveTo(position)).toBe(false);
  });
});

describe('Test bishop collisions', () => {
  let bishop: Bishop;
  let board: Board;
  beforeEach(() => {
    bishop = new Bishop('White', new Position('C', 1));
    const whitePawn = new Pawn('White', new Position('A', 3));
    const blackPawn = new Pawn('Black', new Position('E', 3));
    board = new Board([bishop, whitePawn, blackPawn]);
    bishop.setBoard(board);
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should not move when there is a piece before the destination', () => {
    const position = new Position('F', 4);
    expect(bishop.canMoveTo(position)).toBe(false);
  });

  it('Should not move when there is an own piece in the destination', () => {
    const position = new Position('A', 3);
    expect(bishop.canMoveTo(position)).toBe(false);
  });

  it('Should capture when there is an opponent piece in the destination', () => {
    const position = new Position('E', 3);
    expect(bishop.canMoveTo(position)).toBe(true);
  });
});
