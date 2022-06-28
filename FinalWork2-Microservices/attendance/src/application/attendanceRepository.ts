import { Attendance } from '../domain/attendance';

export interface AttendanceRepository {
  saveAttendance(attendance: Attendance): Promise<void>;
  listAttendances(): Promise<Attendance[]>;
  deleteAttendance(id: string): Promise<void>;
}
