import { userPropsMock } from './userPropsMock';

export class UserServiceMock {
  private getUserMock: jest.Mock;
  userApiUrl: string;

  constructor() {
    this.getUserMock = jest.fn();
  }

  async getUser(id: string) {
    this.getUserMock(id);
    return { ...userPropsMock };
  }
}
