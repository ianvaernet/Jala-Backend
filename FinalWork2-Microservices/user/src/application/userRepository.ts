import { User } from '../domain/user';
import { ListUsersFilters } from '../types';

export interface UserRepository {
  listUsers(filters: ListUsersFilters): Promise<User[]>;
  findUser(id: string): Promise<User | null>;
  saveUser(user: User): Promise<void>;
  deleteUser(id: string): Promise<boolean>;
}
