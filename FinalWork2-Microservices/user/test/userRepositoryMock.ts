import { UserRepository } from '../src/application/userRepository';
import { User } from '../src/domain/user';
import { ListUsersFilters } from '../src/types';
import { userPropsMock } from './userPropsMock';

export const listUsersResponse = [new User({ ...userPropsMock })];

export class UserRepositoryMock implements UserRepository {
  private listUsersMock: jest.Mock;
  private findUserMock: jest.Mock;
  private saveUserMock: jest.Mock;
  private deleteUserMock: jest.Mock;

  constructor() {
    this.listUsersMock = jest.fn();
    this.findUserMock = jest.fn();
    this.saveUserMock = jest.fn();
    this.deleteUserMock = jest.fn();
  }

  async listUsers(filters: ListUsersFilters) {
    this.listUsersMock(filters);
    return listUsersResponse;
  }

  async findUser(id: string) {
    this.findUserMock(id);
    return new User({ ...userPropsMock });
  }

  async saveUser(user: User) {
    this.saveUserMock(user);
  }

  async deleteUser(id: string) {
    this.deleteUserMock(id);
    return true;
  }

  assertListUsersHasBeenCalledWith(expected: ListUsersFilters) {
    expect(this.listUsersMock).toHaveBeenCalledWith(expected);
  }

  assertFindUserHasBeenCalledWith(expected: string) {
    expect(this.findUserMock).toHaveBeenCalledWith(expected);
  }

  assertSaveUserHasBeenCalledWith(expected: User) {
    expect(this.saveUserMock).toHaveBeenCalledWith(expected);
  }

  assertDeleteUserHasBeenCalledWith(expected: string) {
    expect(this.deleteUserMock).toHaveBeenCalledWith(expected);
  }
}
