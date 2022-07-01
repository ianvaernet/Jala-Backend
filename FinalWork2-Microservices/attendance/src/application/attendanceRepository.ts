import { Attendance } from '../domain/attendance';
import { ListAttendancesFilters } from '../types';

export interface AttendanceRepository {
  listAttendances(filters: ListAttendancesFilters): Promise<Attendance[]>;
  findAttendance(id: string): Promise<Attendance | void>;
  saveAttendance(attendance: Attendance): Promise<void>;
  deleteAttendance(id: string): Promise<void>;
  deleteUserAttendances(userId: string): Promise<void>;
}
