import { Container } from 'inversify';
import { AttendanceRepository } from './application/attendanceRepository';
import { AttendanceMongooseRepository } from './infrastructure/attendanceMongooseRepository';
import { AttendanceService } from './application/attendanceService';
import { AttendanceController } from './infrastructure/presentation/attendanceController';
import { DI } from './types';
import { UserService } from './application/userService';

export const DIContainer = new Container();

DIContainer.bind<AttendanceController>(DI.AttendanceController).to(AttendanceController);
DIContainer.bind<AttendanceService>(DI.AttendanceService).to(AttendanceService);
DIContainer.bind<AttendanceRepository>(DI.AttendanceRepository).to(AttendanceMongooseRepository);
DIContainer.bind<UserService>(DI.UserService).to(UserService);
