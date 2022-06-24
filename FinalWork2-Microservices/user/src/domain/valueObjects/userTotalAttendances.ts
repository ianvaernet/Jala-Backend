import { NumberValueObject } from '../numberValueObject';

export class UserTotalAttendance extends NumberValueObject {
  constructor(value: number) {
    super(value, 'totalAttendances');
  }
}
