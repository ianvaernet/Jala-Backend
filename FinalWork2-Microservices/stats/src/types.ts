export type User = {
  id: string;
  nickname: string;
  fullName: string;
  totalAttendance: number;
  attendances?: unknown[];
};

export enum Event {
  AttendanceCreated = 'AttendanceCreated',
  AttendanceDeleted = 'AttendanceDeleted',
}
