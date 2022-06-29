export const DI = {
  UserController: Symbol('UserController'),
  UserService: Symbol('UserService'),
  UserRepository: Symbol('UserRepository'),
  AttendanceService: Symbol('AttendanceService'),
};

export type Attendance = {
  id: string;
  startDate: string;
  endDate: string;
  notes?: string;
};

export type ListUsersFilters = {
  nickname?: string;
  fullName?: string;
};
