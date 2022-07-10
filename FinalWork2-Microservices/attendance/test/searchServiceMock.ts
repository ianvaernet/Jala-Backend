import { SearchService } from '../src/application/searchService';
import { Attendance } from '../src/domain/attendance';
import { attendancePropsMock } from './attendancePropsMock';

export const searchAttendancesResponse = [new Attendance({ ...attendancePropsMock })];

export class SearchServiceMock implements SearchService {
  private indexAttendanceMock: jest.Mock;
  private searchAttendancesMock: jest.Mock;
  private deleteAttendanceMock: jest.Mock;
  private deleteUserAttendancesMock: jest.Mock;

  constructor() {
    this.indexAttendanceMock = jest.fn();
    this.searchAttendancesMock = jest.fn();
    this.deleteAttendanceMock = jest.fn();
    this.deleteUserAttendancesMock = jest.fn();
  }

  async indexAttendance(attendance: Attendance) {
    this.indexAttendanceMock(attendance);
  }

  async searchAttendances(search: string) {
    this.searchAttendancesMock(search);
    return searchAttendancesResponse;
  }

  async deleteAttendance(id: string) {
    this.deleteAttendanceMock(id);
  }

  async deleteUserAttendances(userId: string) {
    this.deleteUserAttendancesMock(userId);
  }

  assertIndexAttendanceHasBeenCalledWith(expected: Attendance) {
    expect(this.indexAttendanceMock).toHaveBeenCalledWith(expected);
  }

  assertSearchAttendancesHasBeenCalledWith(expected: string) {
    expect(this.searchAttendancesMock).toHaveBeenCalledWith(expected);
  }

  assertDeleteAttendanceHasBeenCalledWith(expected: string) {
    expect(this.deleteAttendanceMock).toHaveBeenCalledWith(expected);
  }

  assertDeleteUserAttendancesHasBeenCalledWith(expected: string) {
    expect(this.deleteUserAttendancesMock).toHaveBeenCalledWith(expected);
  }
}
