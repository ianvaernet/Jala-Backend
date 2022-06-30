import { AggregateRoot } from './aggregateRoot';
import { AttendanceEndDate } from './valueObjects/attendanceEndDate';
import { AttendanceId } from './valueObjects/attendanceId';
import { AttendanceNotes } from './valueObjects/attendanceNotes';
import { AttendanceStartDate } from './valueObjects/attendanceStartDate';
import { UserId } from './valueObjects/userId';

interface AttendanceProps {
  id: AttendanceId;
  startDate: AttendanceStartDate;
  endDate: AttendanceEndDate;
  notes?: AttendanceNotes;
  userId: UserId;
}

interface AttendancePrimitiveProps {
  id: string;
  startDate: string;
  endDate: string;
  notes?: string;
  userId: string;
}

export class Attendance extends AggregateRoot<AttendanceProps> {
  props: AttendanceProps;
  constructor(props: AttendancePrimitiveProps) {
    super(props);
    this.props.id = new AttendanceId(props.id);
    this.props.startDate = new AttendanceStartDate(props.startDate);
    this.props.endDate = new AttendanceEndDate(props.endDate);
    if (props.notes) {
      this.props.notes = new AttendanceNotes(props.notes);
    }
    this.props.userId = new UserId(props.userId);
  }

  get id() {
    return this.props.id;
  }
  get startDate() {
    return this.props.startDate;
  }
  get endDate() {
    return this.props.endDate;
  }
  get notes() {
    return this.props.notes;
  }
  get userId() {
    return this.props.userId;
  }
}
