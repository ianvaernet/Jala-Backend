import { Board } from '../../src/board';
import { Knight, Pawn } from '../../src/piece';
import { Position } from '../../src/position';

describe('Test knight movement', () => {
  let knight: Knight;
  beforeEach(() => {
    knight = new Knight('White', new Position('D', 4));
    knight.setBoard(new Board([knight]));
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should move two step forward and one step left', () => {
    expect(knight.canMoveTo(new Position('C', 6))).toBe(true);
  });

  it('Should move two step forward and one step right', () => {
    expect(knight.canMoveTo(new Position('E', 6))).toBe(true);
  });

  it('Should move two step right and one step forward', () => {
    expect(knight.canMoveTo(new Position('F', 5))).toBe(true);
  });

  it('Should move two step right and one step back', () => {
    expect(knight.canMoveTo(new Position('F', 3))).toBe(true);
  });

  it('Should move two step back and one step right', () => {
    expect(knight.canMoveTo(new Position('E', 2))).toBe(true);
  });

  it('Should move two step back and one step left', () => {
    expect(knight.canMoveTo(new Position('C', 2))).toBe(true);
  });

  it('Should move two step left and one step back', () => {
    expect(knight.canMoveTo(new Position('B', 3))).toBe(true);
  });

  it('Should move two step left and one step forward', () => {
    expect(knight.canMoveTo(new Position('B', 5))).toBe(true);
  });

  it('Should not move one step forward', () => {
    expect(knight.canMoveTo(new Position('D', 5))).toBe(false);
  });

  it('Should not move one step in diagonal', () => {
    expect(knight.canMoveTo(new Position('E', 5))).toBe(false);
  });
});

describe('Test knight collisions', () => {
  let knight: Knight;
  let board: Board;
  beforeEach(() => {
    knight = new Knight('White', new Position('B', 1));
    const whitePawn = new Pawn('White', new Position('A', 3));
    const blackPawn = new Pawn('Black', new Position('D', 2));
    board = new Board([knight, whitePawn, blackPawn]);
    knight.setBoard(board);
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should not move when there is an own piece in the destination', () => {
    const position = new Position('A', 3);
    expect(knight.canMoveTo(position)).toBe(false);
  });

  it('Should capture when there is an opponent piece in the destination', () => {
    const position = new Position('D', 2);
    expect(knight.canMoveTo(position)).toBe(true);
  });
});
