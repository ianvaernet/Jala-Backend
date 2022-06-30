import { inject, injectable } from 'inversify';
import { Attendance } from '../domain/attendance';
import { AttendanceRepository } from './attendanceRepository';
import { CreateAttendanceRequest } from './dto/createAttendanceRequest';
import { v4 as uuid } from 'uuid';
import { DI, ListAttendancesFilters } from '../types';
import { UserService } from './userService';
import { BadRequestException, NotFoundException } from './exceptions';
import { InvalidValueException } from '../domain/exceptions';

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
    if (!newAttendance.userId) throw new BadRequestException('userId is required');
    if (!newAttendance.startDate) throw new BadRequestException('startDate is required');
    if (!newAttendance.endDate) throw new BadRequestException('endDate is required');

    try {
      const attendance = new Attendance({ ...newAttendance, id: uuid() });
      const user = await this.userService.getUser(attendance.userId.getValue());
      if (!user) {
        throw new NotFoundException(`There is no user with id ${attendance.userId.getValue()}`);
      }
      await this.attendanceRepository.saveAttendance(attendance);
      return attendance;
    } catch (error) {
      if (error instanceof InvalidValueException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async deleteAttendance(id: string) {
    await this.attendanceRepository.deleteAttendance(id);
  }

  async deleteUserAttendances(userId: string) {
    await this.attendanceRepository.deleteUserAttendances(userId);
  }
}
