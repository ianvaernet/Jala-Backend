import { User } from './user.model';

export type ListUserParams = { filters?: Record<string, unknown>; pageNumber?: number; pageSize?: number };

export interface IUserService {
  listUsers({ pageNumber, pageSize }: ListUserParams): Promise<User[]>;
  createUser(createUserInput: any): Promise<User>;
  getUser(id: number): Promise<User>;
  updateUser(id: number, updateUserInput: any): Promise<User>;
  deleteUser(id: number): Promise<void>;
}
