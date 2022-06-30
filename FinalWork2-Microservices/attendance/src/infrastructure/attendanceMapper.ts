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
      _id: attendance.id.getValue(),
      startDate: attendance.startDate.getValue(),
      endDate: attendance.endDate.getValue(),
      notes: attendance.notes?.getValue(),
      userId: attendance.userId.getValue(),
    });
  }

  static toResponseDto(attendance: Attendance) {
    return {
      id: attendance.id.getValue(),
      startDate: attendance.startDate.getValue(),
      endDate: attendance.endDate.getValue(),
      notes: attendance.notes?.getValue(),
      userId: attendance.userId.getValue(),
    };
  }
}
