import { UserDTO } from '../API';
import { User } from '../core';
import { Mapper } from '../../shared';

export const UserMapper: Mapper<User, UserDTO> = class UserMapper {
  static toDTO(model: User): UserDTO {
    return {
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
    };
  }
};
