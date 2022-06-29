import { inject, injectable } from 'inversify';
import { Attendance } from '../domain/attendance';
import { AttendanceRepository } from './attendanceRepository';
import { CreateAttendanceRequest } from './dto/createAttendanceRequest';
import { v4 as uuid } from 'uuid';
import { DI, ListAttendancesFilters } from '../types';

@injectable()
export class AttendanceService {
  constructor(@inject(DI.AttendanceRepository) private attendanceRepository: AttendanceRepository) {}

  async listAttendances(filters: ListAttendancesFilters) {
    const attendances = this.attendanceRepository.listAttendances(filters);
    return attendances;
  }

  async createAttendance(newAttendance: CreateAttendanceRequest) {
    const attendance = new Attendance({ ...newAttendance, id: uuid() });
    await this.attendanceRepository.saveAttendance(attendance);
    return attendance;
  }

  async deleteAttendance(id: string) {
    await this.attendanceRepository.deleteAttendance(id);
  }
}
