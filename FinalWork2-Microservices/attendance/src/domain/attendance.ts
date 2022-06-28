interface AttendanceProps {
  id: string;
  startDate: string;
  endDate: string;
  notes?: string;
  userId: string;
}

export class Attendance {
  props: AttendanceProps;
  constructor(props: AttendanceProps) {
    this.props = props;
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
