import { injectable } from 'inversify';
import fetch from 'node-fetch';
import { User } from '../types';
import { NotFoundException } from './exceptions';

@injectable()
export class UserService {
  userApiUrl: string;
  constructor() {
    this.userApiUrl = process.env.USER_API_URL as string;
  }

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${this.userApiUrl}/users/${id}`);
    const { data } = (await response.json()) as { data: User };
    if (!data) {
      throw new NotFoundException(`There is no user with id ${id}`);
    }
    return data;
  }
}
