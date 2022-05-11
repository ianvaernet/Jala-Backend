import { Shape } from './shape';

export default class Rectangle extends Shape {
  constructor(public length: number, public width: number) {}

  calculateArea() {
    return this.width * this.length;
  }
}
