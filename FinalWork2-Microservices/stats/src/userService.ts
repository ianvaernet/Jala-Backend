import fetch from 'node-fetch';
import { AttendanceService } from './attendanceService';
import { User } from './types';

export class UserService {
  private userApiUrl: string;
  private attendanceService: AttendanceService;

  constructor() {
    this.userApiUrl = process.env.USER_API_URL as string;
    this.attendanceService = new AttendanceService();
  }

  private async updateUser(id: string, user: { totalAttendance: number }): Promise<User> {
    const response = await fetch(`${this.userApiUrl}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data } = (await response.json()) as { data: User };
    return data;
  }

  async updateTotalAttendance(id: string): Promise<User> {
    const totalAttendances = await this.attendanceService.getAttendancesByUser(id);
    const updatedUser = await this.updateUser(id, { totalAttendance: totalAttendances.length });
    return updatedUser;
  }
}
