import { Attendance } from '../domain/attendance';
import { ListAttendancesFilters } from '../types';

export interface AttendanceRepository {
  listAttendances(filters: ListAttendancesFilters): Promise<Attendance[]>;
  saveAttendance(attendance: Attendance): Promise<void>;
  deleteAttendance(id: string): Promise<void>;
}
