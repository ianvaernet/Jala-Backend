import { inject, injectable } from 'inversify';
import { Attendance } from '../domain/attendance';
import { AttendanceRepository } from './attendanceRepository';
import { CreateAttendanceRequest } from './dto/createAttendanceRequest';
import { v4 as uuid } from 'uuid';
import { DI, ListAttendancesFilters } from '../types';
import { UserService } from './userService';
import { BadRequestException } from './exceptions';
import { InvalidValueException } from '../domain/exceptions';
import { StatsService } from './statsService';
import { SearchService } from './searchService';

@injectable()
export class AttendanceService {
  constructor(
    @inject(DI.AttendanceRepository) private attendanceRepository: AttendanceRepository,
    @inject(DI.UserService) private userService: UserService,
    @inject(DI.StatsService) private statsService: StatsService,
    @inject(DI.SearchService) private searchService: SearchService
  ) {}

  async listAttendances(filters: ListAttendancesFilters) {
    const attendances = this.attendanceRepository.listAttendances(filters);
    return attendances;
  }

  async searchAttendances(search: string) {
    const attendances = await this.searchService.searchAttendances(search);
    return attendances;
  }

  async createAttendance(newAttendance: CreateAttendanceRequest) {
    if (!newAttendance.userId) throw new BadRequestException('userId is required');
    if (!newAttendance.startDate) throw new BadRequestException('startDate is required');
    if (!newAttendance.endDate) throw new BadRequestException('endDate is required');

    try {
      const attendance = new Attendance({ ...newAttendance, id: uuid() });
      await this.userService.getUser(attendance.userId.getValue());
      await this.attendanceRepository.saveAttendance(attendance);
      this.statsService.publishMessage(JSON.stringify({ event: 'AttendanceCreated', userId: attendance.userId.getValue() }));
      await this.searchService.indexAttendance(attendance);
      return attendance;
    } catch (error) {
      if (error instanceof InvalidValueException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async deleteAttendance(id: string) {
    const attendance = (await this.attendanceRepository.findAttendance(id)) as Attendance;
    await this.attendanceRepository.deleteAttendance(id);
    this.statsService.publishMessage(JSON.stringify({ event: 'AttendanceDeleted', userId: attendance.userId.getValue() }));
    await this.searchService.deleteAttendance(id);
  }

  async deleteUserAttendances(userId: string) {
    await this.attendanceRepository.deleteUserAttendances(userId);
    await this.searchService.deleteUserAttendances(userId);
  }
}
