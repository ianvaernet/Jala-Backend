import { SearchService } from '../src/application/searchService';
import { User } from '../src/domain/user';
import { userPropsMock } from './userPropsMock';

export const searchUsersResponse = [new User({ ...userPropsMock })];

export class SearchServiceMock implements SearchService {
  private indexUserMock: jest.Mock;
  private updateUserMock: jest.Mock;
  private searchUsersMock: jest.Mock;
  private deleteUserMock: jest.Mock;

  constructor() {
    this.indexUserMock = jest.fn();
    this.updateUserMock = jest.fn();
    this.searchUsersMock = jest.fn();
    this.deleteUserMock = jest.fn();
  }

  async indexUser(user: User) {
    this.indexUserMock(user);
  }

  async updateUser(id: string, user: User) {
    this.updateUserMock(id, user);
  }

  async searchUsers(search: string) {
    this.searchUsersMock(search);
    return searchUsersResponse;
  }

  async deleteUser(id: string) {
    this.deleteUserMock(id);
  }

  assertIndexUserHasBeenCalledWith(expected: User) {
    expect(this.indexUserMock).toHaveBeenCalledWith(expected);
  }

  assertUpdateUserHasBeenCalledWith(expected: string, expected2: User) {
    expect(this.updateUserMock).toHaveBeenCalledWith(expected, expected2);
  }

  assertSearchUsersHasBeenCalledWith(expected: string) {
    expect(this.searchUsersMock).toHaveBeenCalledWith(expected);
  }

  assertDeleteUserHasBeenCalledWith(expected: string) {
    expect(this.deleteUserMock).toHaveBeenCalledWith(expected);
  }
}
