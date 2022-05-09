import { King } from '../../src/piece';
import { Position } from '../../src/position';

describe('Test king movement', () => {
  let king: King;
  beforeEach(() => {
    king = new King('White', new Position('E', 2));
  });

  it('Should move one step forward', () => {
    expect(king.canMove(new Position('E', 3))).toBe(true);
  });

  it('Should move one step forward-right', () => {
    expect(king.canMove(new Position('F', 3))).toBe(true);
  });

  it('Should move one step right', () => {
    expect(king.canMove(new Position('F', 2))).toBe(true);
  });

  it('Should move one step right-back', () => {
    expect(king.canMove(new Position('F', 1))).toBe(true);
  });

  it('Should move one step back', () => {
    expect(king.canMove(new Position('E', 1))).toBe(true);
  });

  it('Should move one step back-left', () => {
    expect(king.canMove(new Position('D', 1))).toBe(true);
  });

  it('Should move one step left', () => {
    expect(king.canMove(new Position('D', 2))).toBe(true);
  });

  it("Shouldn't move to the same position", () => {
    expect(king.canMove(new Position('E', 2))).toBe(false);
  });

  it("Shouldn't move 2 steps", () => {
    expect(king.canMove(new Position('E', 4))).toBe(false);
  });
});
