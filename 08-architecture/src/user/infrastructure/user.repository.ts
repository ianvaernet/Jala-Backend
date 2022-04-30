import { injectable } from 'inversify';
import { FindManyOptions, Repository } from 'typeorm';
import { mySQLDataSource } from '../../shared';
import { IUserRepository, ListUserParams } from '../core';
import { User } from '../core';

@injectable()
export class UserRepository implements IUserRepository {
  repo: Repository<User>;

  constructor() {
    this.repo = mySQLDataSource.getRepository(User);
  }

  listUsers({ pageNumber = 1, pageSize }: ListUserParams) {
    const options: FindManyOptions = {};
    if (pageSize) {
      options.take = pageSize;
      options.skip = (pageNumber - 1) * pageSize;
    }
    return this.repo.find(options);
  }

  findUserById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async deleteUserById(id: number) {
    const result = await this.repo.delete(id);
    return result.affected ? true : false;
  }

  async save(user: User) {
    await this.repo.save(user);
  }
}
