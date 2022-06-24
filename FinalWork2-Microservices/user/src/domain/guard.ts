export class Guard {
  static ensureMinLength(value: string, minLength: number, propertyName: string) {
    if (value.length < minLength) {
      throw new Error(`${propertyName} must be at least ${minLength} characters long`);
    }
  }
  static ensureMaxLength(value: string, maxLength: number, propertyName: string) {
    if (value.length > maxLength) {
      throw new Error(`${propertyName} must be at maximum ${maxLength} characters long`);
    }
  }
}
