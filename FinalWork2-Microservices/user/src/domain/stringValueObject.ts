export class StringValueObject {
  private value: string;
  public propertyName: string;

  constructor(value: string, propertyName: string) {
    if (typeof value !== 'string') {
      throw new Error('Value must be a string');
    }
    this.value = value;
    this.propertyName = propertyName;
  }

  getValue() {
    return this.value;
  }
}
