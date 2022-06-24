import { InvalidValueException } from '../exceptions';
import { Guard } from '../guard';
import { StringValueObject } from '../stringValueObject';

export class UserFullName extends StringValueObject {
  constructor(value: string) {
    super(value, 'fullName');
    const names = value.split(' ');
    if (names.length < 2) {
      throw new InvalidValueException("User's full name must contain at least two names");
    }

    Guard.ensureMinLength(value, 5, this.propertyName);
    Guard.ensureMaxLength(value, 50, this.propertyName);
  }
}
