import fetch from 'node-fetch';

export class AttendanceService {
  private attendanceApiUrl: string;

  constructor() {
    this.attendanceApiUrl = process.env.ATTENDANCE_API_URL as string;
  }

  async getAttendancesByUser(userId: string): Promise<unknown[]> {
    const response = await fetch(`${this.attendanceApiUrl}/attendances?userId=${userId}`);
    const { data } = (await response.json()) as { data: unknown[] };
    return data;
  }
}
