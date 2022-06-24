import { User } from '../domain/user';
import { UserEntity } from './user.entity';

export class UserMapper {
  static toPersistence(user: User): UserEntity {
    return {
      id: user.id.getValue(),
      nickname: user.nickname.getValue(),
      fullName: user.fullName.getValue(),
      totalAttendance: user.totalAttendance.getValue(),
    };
  }

  static toDomain(userEntity: UserEntity): User {
    return new User({
      id: userEntity.id,
      nickname: userEntity.nickname,
      fullName: userEntity.fullName,
      totalAttendance: userEntity.totalAttendance,
    });
  }

  static toResponseUser(user: User) {
    return {
      id: user.id.getValue(),
      nickname: user.nickname.getValue(),
      fullName: user.fullName.getValue(),
      totalAttendance: user.totalAttendance.getValue(),
      attendances: user.attendances,
    };
  }
}
