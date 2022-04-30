import { inject, injectable } from 'inversify';
import { IUserRepository, IUserService, User } from '../core';
import { NotFoundException } from '../../shared';
import { DI } from '../../types';

@injectable()
export class UserService implements IUserService {
  @inject(DI.IUserRepository) private userRepository: IUserRepository;

  listUsers() {
    return this.userRepository.listUsers({});
  }

  createUser(newUser: User): Promise<void> {
    return this.userRepository.save(newUser);
  }

  async getUser(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: number, updatedUser: User) {
    const user = await this.getUser(id);
    if (updatedUser.firstName) user.firstName = updatedUser.firstName;
    if (updatedUser.lastName) user.lastName = updatedUser.lastName;
    if (updatedUser.email) user.email = updatedUser.email;
    this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: number) {
    const success = await this.userRepository.deleteUserById(id);
    if (!success) throw new NotFoundException('User not found');
  }
}
