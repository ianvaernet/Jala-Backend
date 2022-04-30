import { User } from './user.model';

export type ListUserParams = { filters?: Record<string, unknown>; pageNumber?: number; pageSize?: number };
export type Sucess = boolean;

export interface IUserRepository {
  listUsers({ pageNumber, pageSize }: ListUserParams): Promise<User[]>;
  findUserById(id: number): Promise<User | null>;
  deleteUserById(id: number): Promise<Sucess>;
  save(user: User): Promise<void>;
}
