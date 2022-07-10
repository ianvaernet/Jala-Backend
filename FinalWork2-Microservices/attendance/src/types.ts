import { Attendance } from './domain/attendance';

export const DI = {
  AttendanceController: Symbol('AttendanceController'),
  AttendanceService: Symbol('AttendanceService'),
  AttendanceRepository: Symbol('AttendanceRepository'),
  UserService: Symbol('UserService'),
  StatsService: Symbol('StatsService'),
  SearchService: Symbol('SearchService'),
};

export type ListAttendancesFilters = {
  userId?: string;
};

export type User = {
  id: string;
  nickname: string;
  fullName: string;
  totalAttendance: number;
  attendances: Attendance[];
};

export enum Event {
  AttendanceCreated = 'AttendanceCreated',
  AttendanceDeleted = 'AttendanceDeleted',
}
