import { injectable } from 'inversify';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { UserRepository } from '../application/userRepository';
import { User } from '../domain/user';
import { ListUsersFilters } from '../types';
import { mySQLDataSource } from './mySqlDatasource';
import { UserEntity } from './user.entity';
import { UserMapper } from './userMapper';

@injectable()
export class UserTypeOrmRepository implements UserRepository {
  private readonly repo: Repository<UserEntity>;

  constructor() {
    this.repo = mySQLDataSource.getRepository(UserEntity);
  }

  async listUsers(filters: ListUsersFilters): Promise<User[]> {
    const query: FindManyOptions = {};
    if (filters) {
      query.where = {};
      if (filters.fullName) {
        query.where.fullName = Like(`%${filters.fullName}%`);
      }
      if (filters.nickname) {
        query.where.nickname = Like(`%${filters.nickname}%`);
      }
    }
    const users = await this.repo.find(query);
    return users.map((user) => UserMapper.toDomain(user));
  }

  async findUser(id: string): Promise<User | null> {
    const userEntity = await this.repo.findOneBy({ id });
    const user = userEntity ? UserMapper.toDomain(userEntity) : null;
    return user;
  }

  async saveUser(user: User): Promise<void> {
    const userEntity = UserMapper.toPersistence(user);
    await this.repo.save(userEntity);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    const wasDeleted = !!result.affected && result.affected > 0;
    return wasDeleted;
  }
}
