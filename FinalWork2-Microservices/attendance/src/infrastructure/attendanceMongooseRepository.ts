import { injectable } from 'inversify';
import { AttendanceRepository } from '../application/attendanceRepository';
import { Attendance } from '../domain/attendance';
import { ListAttendancesFilters } from '../types';
import { AttendanceEntity } from './attendance.entity';
import { AttendanceMapper } from './attendanceMapper';

@injectable()
export class AttendanceMongooseRepository implements AttendanceRepository {
  async listAttendances(filters: ListAttendancesFilters): Promise<Attendance[]> {
    const attendanceEntities = await AttendanceEntity.find(filters);
    return attendanceEntities.map((attendanceEntity) => AttendanceMapper.toDomain(attendanceEntity));
  }

  async findAttendance(id: string): Promise<Attendance | void> {
    const attendanceEntity = await AttendanceEntity.findById(id);
    if (attendanceEntity) {
      return AttendanceMapper.toDomain(attendanceEntity);
    }
  }

  async saveAttendance(attendance: Attendance) {
    const attendanceEntity = AttendanceMapper.toPersistence(attendance);
    await attendanceEntity.save();
  }

  async deleteAttendance(id: string) {
    const { deletedCount } = await AttendanceEntity.deleteOne({ _id: id });
    return deletedCount > 0;
  }

  async deleteUserAttendances(userId: string) {
    const { deletedCount } = await AttendanceEntity.deleteMany({ userId });
    return deletedCount > 0;
  }
}
