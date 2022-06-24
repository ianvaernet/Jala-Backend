import { StringValueObject } from './stringValueObject';

export class UUID extends StringValueObject {
  constructor(value: string, propertyName: string) {
    super(value, propertyName);
  }
}
