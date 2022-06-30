import { inject, injectable } from 'inversify';
import { v4 as uuid } from 'uuid';
import { InvalidValueException } from '../domain/exceptions';
import { User } from '../domain/user';
import { DI, ListUsersFilters } from '../types';
import { AttendanceService } from './attendanceService';
import { CreateUserRequest } from './dtos/createUserRequest';
import { BadRequestException, NotFoundException } from './exceptions';
import { UserRepository } from './userRepository';

@injectable()
export class UserService {
  constructor(
    @inject(DI.UserRepository) private userRepository: UserRepository,
    @inject(DI.AttendanceService) private attendanceService: AttendanceService
  ) {}

  async listUsers(filters: ListUsersFilters) {
    const users = await this.userRepository.listUsers(filters);
    return users;
  }

  async createUser(newUser: CreateUserRequest) {
    if (!newUser.nickname) throw new BadRequestException('nickname is required');
    if (!newUser.fullName) throw new BadRequestException('fullName is required');

    try {
      const user = new User({ ...newUser, id: uuid(), totalAttendance: 0 });
      this.userRepository.saveUser(user);
      return user;
    } catch (error) {
      if (error instanceof InvalidValueException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async getUser(id: string, includeAttendances: boolean) {
    const user = await this.userRepository.findUser(id);
    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }

    if (includeAttendances) {
      const attendances = await this.attendanceService.listAttendancesByUserId(user.id.getValue());
      user.attendances = attendances;
    }

    return user;
  }

  async deleteUser(id: string) {
    const isDeleted = await this.userRepository.deleteUser(id);
    await this.attendanceService.deleteUserAttendances(id);
    if (!isDeleted) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }
  }
}
