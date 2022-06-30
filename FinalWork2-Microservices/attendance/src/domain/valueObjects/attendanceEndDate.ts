import { DateValueObject } from '../dateValueObject';
import { Guard } from '../guard';

export class AttendanceEndDate extends DateValueObject {
  constructor(value: string | Date) {
    super(value, 'endDate');
    Guard.ensureDateIsNotInFuture(this.value, this.propertyName);
  }
}
