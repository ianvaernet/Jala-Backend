import { Guard } from './guard';

export class StringValueObject {
  private value: string;
  public propertyName: string;

  constructor(value: string, propertyName: string) {
    Guard.ensureIsString(value, propertyName);
    this.value = value;
    this.propertyName = propertyName;
  }

  getValue() {
    return this.value;
  }

  equals(to: StringValueObject): boolean {
    return this.value !== undefined && this.value === to.value;
  }
}
