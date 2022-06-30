import { Guard } from './guard';

export class DateValueObject {
  protected value: Date;
  public propertyName: string;

  constructor(value: string | Date, propertyName: string) {
    if (typeof value === 'string') {
      value = new Date(value);
    }
    this.value = value;
    this.propertyName = propertyName;
    Guard.ensureIsDate(value, this.propertyName);
  }

  public getValue(): Date {
    return this.value;
  }
}
