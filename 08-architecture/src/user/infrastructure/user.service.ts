import { User } from '../core';
import { DI } from '../../inversify.config';
import { inject, injectable } from 'inversify';
import { NotFoundException } from '../../shared';
import { IUserRepository, IUserService } from '../core';
 
@injectable()
export class UserService implements IUserService {
  @inject(DI.IUserRepository) private userRepository: IUserRepository;

  listUsers() {
    return this.userRepository.listUsers({});
  }

  createUser(createUserInput: any): Promise<User> {
    const user = new User();
    user.firstName = createUserInput.firstName;
    user.lastName = createUserInput.lastName;
    user.email = createUserInput.email;
    user.password = createUserInput.password;
    return this.userRepository.save(user);
  }

  async getUser(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: number, updateUserInput: any) {
    const user = await this.getUser(id);
    if (updateUserInput.firstName) user.firstName = updateUserInput.firstName;
    if (updateUserInput.lastName) user.lastName = updateUserInput.lastName;
    if (updateUserInput.lastName) user.email = updateUserInput.email;
    this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.deleteUserById(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
  }
}
