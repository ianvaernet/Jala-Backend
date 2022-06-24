import { Guard } from './guard';

export class NumberValueObject {
  protected value: number;
  public propertyName: string;

  constructor(value: number, propertyName: string) {
    Guard.ensureIsNumber(value, this.propertyName);
    Guard.ensureMinValue(value, 0, this.propertyName);
    this.value = value;
    this.propertyName = propertyName;
  }

  public getValue(): number {
    return this.value;
  }
}
