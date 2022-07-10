import { attendancePropsMock } from './attendancePropsMock';

export class AttendanceServiceMock {
  private listAttendancesByUserIdMock: jest.Mock;
  private deleteUserAttendancesMock: jest.Mock;
  AttendanceApiUrl: string;

  constructor() {
    this.listAttendancesByUserIdMock = jest.fn();
    this.deleteUserAttendancesMock = jest.fn();
  }

  async listAttendancesByUserId(id: string) {
    this.listAttendancesByUserIdMock(id);
    return [{ ...attendancePropsMock }];
  }

  async deleteUserAttendances(id: string) {
    this.deleteUserAttendancesMock(id);
  }

  assertListAttendancesByUserIdHasBeenCalledWith(expected: string) {
    expect(this.listAttendancesByUserIdMock).toHaveBeenCalledWith(expected);
  }

  assertDeleteUserAttendancesHasBeenCalledWith(expected: string) {
    expect(this.deleteUserAttendancesMock).toHaveBeenCalledWith(expected);
  }
}
