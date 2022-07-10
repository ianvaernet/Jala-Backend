import 'reflect-metadata';
import { User } from '../src/domain/user';
import { UserService } from '../src/application/userService';
import { createUserRequestMock } from './createUserRequestMock';
import { AttendanceServiceMock } from './attendanceServiceMock';
import { SearchServiceMock, searchUsersResponse } from './searchServiceMock';
import { listUsersResponse, UserRepositoryMock } from './userRepositoryMock';
import { BadRequestException, NotFoundException } from '../src/application/exceptions';
import { userPropsMock } from './userPropsMock';

describe('Test userService', () => {
  let userRepository: UserRepositoryMock;
  let attendanceService: AttendanceServiceMock;
  let searchService: SearchServiceMock;
  let userService: UserService;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    attendanceService = new AttendanceServiceMock();
    searchService = new SearchServiceMock();
    userService = new UserService(userRepository, attendanceService, searchService);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Test listUsers', () => {
    it('Should list all users', async () => {
      const response = await userService.listUsers({});

      userRepository.assertListUsersHasBeenCalledWith({});
      expect(response).toMatchObject(listUsersResponse);
    });

    it('Should list users filtered by nickname', async () => {
      const filters = { nickname: 'test' };
      const response = await userService.listUsers(filters);

      userRepository.assertListUsersHasBeenCalledWith(filters);
      expect(response).toMatchObject(listUsersResponse);
    });

    it('Should list users filtered by fullName', async () => {
      const filters = { fullName: 'test' };
      const response = await userService.listUsers(filters);

      userRepository.assertListUsersHasBeenCalledWith(filters);
      expect(response).toMatchObject(listUsersResponse);
    });
  });

  describe('Test searchUsers', () => {
    it('Should do an elastic search of users', async () => {
      const search = 'test';
      const response = await userService.searchUsers(search);

      searchService.assertSearchUsersHasBeenCalledWith(search);
      expect(response).toMatchObject(searchUsersResponse);
    });
  });

  describe('Test createUser', () => {
    it('Should create a user', async () => {
      const response = await userService.createUser(createUserRequestMock);

      const props = {
        ...createUserRequestMock,
        id: response.id.getValue(),
        totalAttendance: 0,
      };
      const user = new User(props);

      userRepository.assertSaveUserHasBeenCalledWith(user);
      searchService.assertIndexUserHasBeenCalledWith(user);
      expect(response).toMatchObject(user);
    });

    it('Should throw a BadRequestException trying to create a user without nickname', async () => {
      await expect(userService.createUser({ fullName: 'Test User' })).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create a user without fullName', async () => {
      await expect(userService.createUser({ nickname: 'testnickname' })).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create a user with a nickname below minLength', async () => {
      await expect(userService.createUser({ fullName: 'Test User', nickname: 't' })).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create a user with a fullName below minLength', async () => {
      await expect(userService.createUser({ fullName: 'T U', nickname: 'testnickname' })).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create a user with only one name as fullName', async () => {
      await expect(userService.createUser({ fullName: 'Testuser', nickname: 'testnickname' })).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create a user with a nickname over maxLength', async () => {
      await expect(
        userService.createUser({
          fullName: 'Test User',
          nickname: 'testnickname'.repeat(10),
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create a user with a fullName over maxLength', async () => {
      await expect(
        userService.createUser({
          fullName: 'Test User'.repeat(10),
          nickname: 'testnickname',
        })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('Test getUser', () => {
    it('Should get a user', async () => {
      const id = 'anId';
      await userService.getUser(id, true);

      userRepository.assertFindUserHasBeenCalledWith(id);
      attendanceService.assertListAttendancesByUserIdHasBeenCalledWith(id);
    });

    it('Should throw a NotFoundException trying to get a non-existent user', async () => {
      jest.spyOn(userRepository, 'findUser').mockReturnValue(Promise.resolve(undefined));

      await expect(userService.getUser('nonExistentId', true)).rejects.toThrow(NotFoundException);
    });
  });

  describe('Test updateUser', () => {
    it('Should update a user totalAttendance', async () => {
      const id = 'userId';
      const updateUserRequest = { totalAttendance: 5 };
      const response = await userService.updateUser(id, updateUserRequest);
      const updatedUser = new User({
        ...userPropsMock,
        ...updateUserRequest,
      });

      userRepository.assertFindUserHasBeenCalledWith(id);
      userRepository.assertSaveUserHasBeenCalledWith(updatedUser);
      searchService.assertUpdateUserHasBeenCalledWith(id, updatedUser);
      expect(response).toMatchObject(updatedUser);
    });

    it('Should throw BadRequestException trying to update user totalAttendance below 0', async () => {
      const id = 'userId';
      const updateUserRequest = { totalAttendance: -3 };

      await expect(userService.updateUser(id, updateUserRequest)).rejects.toThrow(BadRequestException);
    });
  });

  describe('Test deleteUser', () => {
    it('Should delete a user', async () => {
      const id = 'aUserId';
      await userService.deleteUser(id);
      userRepository.assertDeleteUserHasBeenCalledWith(id);
      attendanceService.assertDeleteUserAttendancesHasBeenCalledWith(id);
    });

    it('Should throw a NotFoundException trying to delete a non-existent user', async () => {
      jest.spyOn(userRepository, 'deleteUser').mockReturnValue(Promise.resolve(false));

      await expect(userService.deleteUser('nonExistentId')).rejects.toThrow(NotFoundException);
    });
  });
});
