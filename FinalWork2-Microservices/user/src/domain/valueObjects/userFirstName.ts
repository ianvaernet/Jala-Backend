import { Guard } from '../guard';
import { StringValueObject } from '../stringValueObject';

export class UserFirstName extends StringValueObject {
  constructor(value: string) {
    super(value, 'firstName');
    Guard.ensureMinLength(value, 2, this.propertyName);
    Guard.ensureMaxLength(value, 50, this.propertyName);
  }
}
