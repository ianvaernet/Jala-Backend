import { StringValueObject } from '../stringValueObject';

export class AttendanceNotes extends StringValueObject {
  constructor(value: string) {
    super(value, 'notes');
  }
}
