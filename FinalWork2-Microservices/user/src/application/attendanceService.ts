import { injectable } from 'inversify';
import fetch from 'node-fetch';
import { EventEmitter } from 'stream';
import { Attendance } from '../types';

@injectable()
export class AttendanceService {
  AttendanceApiUrl: string;
  constructor() {
    EventEmitter.setMaxListeners(50);
    this.AttendanceApiUrl = process.env.ATTENDANCE_API_URL as string;
  }

  async listAttendancesByUserId(userId: string): Promise<Attendance[]> {
    const response = await fetch(`${this.AttendanceApiUrl}/attendances?userId=${userId}`);
    const { data } = (await response.json()) as { data: Attendance[] };
    return data;
  }

  async deleteUserAttendances(userId: string): Promise<void> {
    const response = await fetch(`${this.AttendanceApiUrl}/users/${userId}/attendances`, {
      method: 'DELETE',
    });
    if (response.status !== 200) {
      throw new Error("Error deleting user's attendances");
    }
  }
}
