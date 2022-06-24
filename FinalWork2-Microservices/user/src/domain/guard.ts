import { InvalidValueException } from './exceptions';

export class Guard {
  static ensureIsNumber(value: unknown, propertyName: string) {
    if (typeof value !== 'number') {
      throw new InvalidValueException(`${propertyName} must be a number`);
    }
  }

  static ensureMinValue(value: number, minValue: number, propertyName: string) {
    if (value < minValue) {
      throw new InvalidValueException(`${propertyName} cannot be less than ${minValue}`);
    }
  }

  static ensureIsString(value: unknown, propertyName: string) {
    if (typeof value !== 'string') {
      throw new InvalidValueException(`${propertyName} must be a string`);
    }
  }

  static ensureMinLength(value: string, minLength: number, propertyName: string) {
    if (value.length < minLength) {
      throw new InvalidValueException(`${propertyName} must be at least ${minLength} characters long`);
    }
  }
  static ensureMaxLength(value: string, maxLength: number, propertyName: string) {
    if (value.length > maxLength) {
      throw new InvalidValueException(`${propertyName} must be at maximum ${maxLength} characters long`);
    }
  }
}
