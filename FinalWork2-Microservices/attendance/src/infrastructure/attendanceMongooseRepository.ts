import { injectable } from 'inversify';
import { AttendanceRepository } from '../application/attendanceRepository';

@injectable()
export class AttendanceMongooseRepository implements AttendanceRepository {}
