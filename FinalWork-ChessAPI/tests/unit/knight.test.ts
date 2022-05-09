import { Knight } from '../../src/piece';
import { Position } from '../../src/position';

describe('Test knight movement', () => {
  let knight: Knight;
  beforeEach(() => {
    knight = new Knight('White', new Position('D', 4));
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
  });

  it('Should move two step forward and one step left', () => {
    expect(knight.canMove(new Position('C', 6))).toBe(true);
  });

  it('Should move two step forward and one step right', () => {
    expect(knight.canMove(new Position('E', 6))).toBe(true);
  });

  it('Should move two step right and one step forward', () => {
    expect(knight.canMove(new Position('F', 5))).toBe(true);
  });

  it('Should move two step right and one step back', () => {
    expect(knight.canMove(new Position('F', 3))).toBe(true);
  });

  it('Should move two step back and one step right', () => {
    expect(knight.canMove(new Position('E', 2))).toBe(true);
  });

  it('Should move two step back and one step left', () => {
    expect(knight.canMove(new Position('C', 2))).toBe(true);
  });

  it('Should move two step left and one step back', () => {
    expect(knight.canMove(new Position('B', 3))).toBe(true);
  });

  it('Should move two step left and one step forward', () => {
    expect(knight.canMove(new Position('B', 5))).toBe(true);
  });

  it('Should not move one step forward', () => {
    expect(knight.canMove(new Position('D', 5))).toBe(false);
  });

  it('Should not move one step in diagonal', () => {
    expect(knight.canMove(new Position('E', 5))).toBe(false);
  });
});
