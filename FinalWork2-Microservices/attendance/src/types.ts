export const DI = {
  AttendanceController: Symbol('AttendanceController'),
  AttendanceService: Symbol('AttendanceService'),
  AttendanceRepository: Symbol('AttendanceRepository'),
};

export type Attendance = {
  id: string;
  startDate: string;
  endDate: string;
  notes?: string;
};
