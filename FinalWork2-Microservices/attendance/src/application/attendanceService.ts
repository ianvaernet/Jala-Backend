import { inject, injectable } from 'inversify';
import { Attendance } from '../domain/attendance';
import { AttendanceRepository } from './attendanceRepository';
import { CreateAttendanceRequest } from './dto/createAttendanceRequest';
import { v4 as uuid } from 'uuid';
import { DI, ListAttendancesFilters } from '../types';
import { UserService } from './userService';
import { NotFoundException } from './exceptions';

@injectable()
export class AttendanceService {
  constructor(
    @inject(DI.AttendanceRepository) private attendanceRepository: AttendanceRepository,
    @inject(DI.UserService) private userService: UserService
  ) {}

  async listAttendances(filters: ListAttendancesFilters) {
    const attendances = this.attendanceRepository.listAttendances(filters);
    return attendances;
  }

  async createAttendance(newAttendance: CreateAttendanceRequest) {
    const attendance = new Attendance({ ...newAttendance, id: uuid() });
    const user = await this.userService.getUser(attendance.userId);
    if (!user) {
      throw new NotFoundException(`There is no user with id ${attendance.userId}`);
    }
    await this.attendanceRepository.saveAttendance(attendance);
    return attendance;
  }

  async deleteAttendance(id: string) {
    await this.attendanceRepository.deleteAttendance(id);
  }
}
