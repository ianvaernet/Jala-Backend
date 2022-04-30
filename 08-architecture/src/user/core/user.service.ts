import { User } from './user.model';

export type ListUserParams = { filters?: Record<string, unknown>; pageNumber?: number; pageSize?: number };

export interface IUserService {
  listUsers({ pageNumber, pageSize }: ListUserParams): Promise<User[]>;
  createUser(newUser: User): Promise<void>;
  getUser(id: number): Promise<User>;
  updateUser(id: number, updatedUser: User): Promise<User>;
  deleteUser(id: number): Promise<void>;
}
