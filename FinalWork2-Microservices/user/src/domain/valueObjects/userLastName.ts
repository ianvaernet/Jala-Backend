import { Guard } from '../guard';
import { StringValueObject } from '../stringValueObject';

export class UserLastName extends StringValueObject {
  constructor(value: string) {
    super(value, 'lastName');
    Guard.ensureMinLength(value, 2, this.propertyName);
    Guard.ensureMaxLength(value, 50, this.propertyName);
  }
}
