import { User } from '../domain/user';

export interface SearchService {
  indexUser(user: User): Promise<void>;
  updateUser(id: string, user: User): Promise<void>;
  searchUsers(search: string): Promise<User[]>;
}
