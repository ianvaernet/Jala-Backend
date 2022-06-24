export const DI = {
  UserController: Symbol('UserController'),
  UserService: Symbol('UserService'),
  UserRepository: Symbol('UserRepository'),
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
