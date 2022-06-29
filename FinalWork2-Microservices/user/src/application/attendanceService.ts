import { injectable } from 'inversify';
import fetch from 'node-fetch';
import { Attendance } from '../types';

@injectable()
export class AttendanceService {
  AttendanceApiUrl: string;
  constructor() {
    this.AttendanceApiUrl = process.env.ATTENDANCE_API_URL as string;
  }

  async listAttendancesByUserId(userId: string): Promise<Attendance[]> {
    const response = await fetch(`${this.AttendanceApiUrl}/attendances?userId=${userId}`);
    const { data } = (await response.json()) as { data: Attendance[] };
    return data;
  }
}
