import { UUID } from '../uuid';

export class AttendanceId extends UUID {
  constructor(value: string) {
    super(value, 'id');
  }
}
