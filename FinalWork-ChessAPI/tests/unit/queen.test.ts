import { Position } from '../../src/position';
import { Pawn, Queen } from '../../src/piece';
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
    expect(queen.canMoveTo(position)).toBe(true);
  });

  it('Should move horizontally', () => {
    const position = new Position('A', 1);
    expect(queen.canMoveTo(position)).toBe(true);
  });

  it('Should move diagonally', () => {
    let position = new Position('H', 5);
    expect(queen.canMoveTo(position)).toBe(true);

    position = new Position('A', 4);
    expect(queen.canMoveTo(position)).toBe(true);
  });

  it('Should not move L', () => {
    let position = new Position('C', 3);
    expect(queen.canMoveTo(position)).toBe(false);

    position = new Position('E', 3);
    expect(queen.canMoveTo(position)).toBe(false);
  });

  it('Should not move other places', () => {
    let position = new Position('C', 5);
    expect(queen.canMoveTo(position)).toBe(false);

    position = new Position('F', 8);
    expect(queen.canMoveTo(position)).toBe(false);
  });
});

describe('Test queen collisions', () => {
  let queen: Queen;
  let board: Board;
  beforeEach(() => {
    queen = new Queen('White', new Position('D', 1));
    const whitePawn = new Pawn('White', new Position('F', 1));
    const blackPawn = new Pawn('Black', new Position('D', 3));
    board = new Board([queen, whitePawn, blackPawn]);
    queen.setBoard(board);
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should not move when there is a piece before the destination', () => {
    const position = new Position('D', 5);
    expect(queen.canMoveTo(position)).toBe(false);
  });

  it('Should not move when there is an own piece in the destination', () => {
    const position = new Position('F', 1);
    expect(queen.canMoveTo(position)).toBe(false);
  });

  it('Should capture when there is an opponent piece in the destination', () => {
    const position = new Position('D', 3);
    expect(queen.canMoveTo(position)).toBe(true);
  });
});
