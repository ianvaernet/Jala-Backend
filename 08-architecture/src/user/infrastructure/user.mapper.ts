import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../API';
import { User } from '../core';
import { Mapper } from '../../shared';

export const UserMapper: Mapper<User, CreateUserDTO | UpdateUserDTO, UserDTO> = class UserMapper {
  static toDomain(dto: CreateUserDTO | UpdateUserDTO): User {
    const user = new User();
    user.email = dto.email;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    if ('password' in dto) user.password = dto.password;
    return user;
  }

  static toDTO(model: User): UserDTO {
    return {
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
    };
  }
};
