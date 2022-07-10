export const DI = {
  UserController: Symbol('UserController'),
  UserService: Symbol('UserService'),
  UserRepository: Symbol('UserRepository'),
  AttendanceService: Symbol('AttendanceService'),
  SearchService: Symbol('SearchService'),
};

export type Attendance = {
  id: string;
  startDate: string;
  endDate: string;
  userId: string;
  notes?: string;
};

export type ListUsersFilters = {
  nickname?: string;
  fullName?: string;
};
