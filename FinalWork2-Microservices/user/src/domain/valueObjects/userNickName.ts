import { Guard } from '../guard';
import { StringValueObject } from '../stringValueObject';

export class UserNickname extends StringValueObject {
  constructor(value: string) {
    super(value, 'nickname');
    Guard.ensureMinLength(value, 2, this.propertyName);
    Guard.ensureMaxLength(value, 50, this.propertyName);
  }
}
