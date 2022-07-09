import { Attendance } from '../domain/attendance';

export interface SearchService {
  indexAttendance(attendance: Attendance): Promise<void>;
  searchAttendances(search: string): Promise<Attendance[]>;
  deleteAttendance(id: string): Promise<void>;
  deleteUserAttendances(userId: string): Promise<void>;
}
