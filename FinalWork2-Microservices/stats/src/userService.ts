import fetch from 'node-fetch';
import { User } from './types';

export class UserService {
  userApiUrl: string;
  constructor() {
    this.userApiUrl = process.env.USER_API_URL as string;
  }

  private async getUser(id: string): Promise<User> {
    const response = await fetch(`${this.userApiUrl}/users/${id}`);
    const { data } = (await response.json()) as { data: User };
    return data;
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

  async incrementTotalAttendance(id: string): Promise<User> {
    const user = await this.getUser(id);
    const updatedUser = await this.updateUser(id, { totalAttendance: user.totalAttendance + 1 });
    return updatedUser;
  }

  async decrementTotalAttendance(id: string): Promise<User> {
    const user = await this.getUser(id);
    const updatedUser = await this.updateUser(id, { totalAttendance: user.totalAttendance - 1 });
    return updatedUser;
  }
}
