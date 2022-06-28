import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  _id: String,
  startDate: String,
  endDate: String,
  notes: String,
  userId: String,
});

export const AttendanceEntity = mongoose.model('Attendance', attendanceSchema);
