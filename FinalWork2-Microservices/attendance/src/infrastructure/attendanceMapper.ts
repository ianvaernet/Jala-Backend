import { Attendance } from '../domain/attendance';
import { AttendanceEntity } from './attendance.entity';

export class AttendanceMapper {
  static toDomain(attendanceEntity: any) {
    return new Attendance({
      id: attendanceEntity._id,
      startDate: attendanceEntity.startDate,
      endDate: attendanceEntity.endDate,
      notes: attendanceEntity.notes,
      userId: attendanceEntity.userId,
    });
  }

  static toPersistence(attendance: Attendance) {
    return new AttendanceEntity({
      _id: attendance.id,
      startDate: attendance.startDate,
      endDate: attendance.endDate,
      notes: attendance.notes,
      userId: attendance.userId,
    });
  }

  static toResponseDto(attendance: Attendance) {
    return {
      id: attendance.id,
      startDate: attendance.startDate,
      endDate: attendance.endDate,
      notes: attendance.notes,
      userId: attendance.userId,
    };
  }
}
