import { DateValueObject } from '../dateValueObject';
import { Guard } from '../guard';

export class AttendanceStartDate extends DateValueObject {
  constructor(value: string | Date) {
    super(value, 'startDate');
    Guard.ensureDateIsNotInFuture(this.value, this.propertyName);
  }
}
