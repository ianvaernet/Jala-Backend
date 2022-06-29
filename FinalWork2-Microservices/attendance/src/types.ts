export const DI = {
  AttendanceController: Symbol('AttendanceController'),
  AttendanceService: Symbol('AttendanceService'),
  AttendanceRepository: Symbol('AttendanceRepository'),
};

export type ListAttendancesFilters = {
  userId?: string;
};
