import { Shape } from './shape';

export default class Square extends Shape {
  constructor(public width: number) {}

  calculateArea(): number {
    return this.width ** 2;
  }
}
