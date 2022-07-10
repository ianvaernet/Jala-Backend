import { AttendanceRepository } from '../src/application/attendanceRepository';
import { Attendance } from '../src/domain/attendance';
import { ListAttendancesFilters } from '../src/types';
import { attendancePropsMock } from './attendancePropsMock';

export const listAttendancesResponse = [new Attendance({ ...attendancePropsMock })];

export class AttendanceRepositoryMock implements AttendanceRepository {
  private listAttendancesMock: jest.Mock;
  private findAttendanceMock: jest.Mock;
  private saveAttendanceMock: jest.Mock;
  private deleteAttendanceMock: jest.Mock;
  private deleteUserAttendancesMock: jest.Mock;

  constructor() {
    this.listAttendancesMock = jest.fn();
    this.findAttendanceMock = jest.fn();
    this.saveAttendanceMock = jest.fn();
    this.deleteAttendanceMock = jest.fn();
    this.deleteUserAttendancesMock = jest.fn();
  }

  async listAttendances(filters: ListAttendancesFilters) {
    this.listAttendancesMock(filters);
    return listAttendancesResponse;
  }

  async findAttendance(id: string) {
    this.findAttendanceMock(id);
    return new Attendance({ ...attendancePropsMock });
  }

  async saveAttendance(attendance: Attendance) {
    this.saveAttendanceMock(attendance);
  }

  async deleteAttendance(id: string) {
    this.deleteAttendanceMock(id);
    return true;
  }

  async deleteUserAttendances(userId: string) {
    this.deleteUserAttendancesMock(userId);
    return true;
  }

  assertListAttendancesHasBeenCalledWith(expected: ListAttendancesFilters) {
    expect(this.listAttendancesMock).toHaveBeenCalledWith(expected);
  }

  assertFindAttendanceHasBeenCalledWith(expected: string) {
    expect(this.findAttendanceMock).toHaveBeenCalledWith(expected);
  }

  assertSaveAttendanceHasBeenCalledWith(expected: Attendance) {
    expect(this.saveAttendanceMock).toHaveBeenCalledWith(expected);
  }

  assertDeleteAttendanceHasBeenCalledWith(expected: string) {
    expect(this.deleteAttendanceMock).toHaveBeenCalledWith(expected);
  }

  assertDeleteUserAttendancesHasBeenCalledWith(expected: string) {
    expect(this.deleteUserAttendancesMock).toHaveBeenCalledWith(expected);
  }
}
