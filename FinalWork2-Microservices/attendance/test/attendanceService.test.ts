import 'reflect-metadata';
import { AttendanceService } from '../src/application/attendanceService';
import { createAttendanceRequestMock } from './createAttendanceRequestMock';
import { UserServiceMock } from './userServiceMock';
import { SearchServiceMock, searchAttendancesResponse } from './searchServiceMock';
import { AttendanceRepositoryMock, listAttendancesResponse } from './attendanceRepositoryMock';
import { BadRequestException, NotFoundException } from '../src/application/exceptions';
import { attendancePropsMock } from './attendancePropsMock';
import { StatsServiceMock } from './statsServiceMock';
import { Attendance } from '../src/domain/attendance';
import { Event } from '../src/types';

describe('Test attendanceService', () => {
  let attendanceRepository: AttendanceRepositoryMock;
  let userService: UserServiceMock;
  let statsService: StatsServiceMock;
  let searchService: SearchServiceMock;
  let attendanceService: AttendanceService;

  beforeEach(() => {
    attendanceRepository = new AttendanceRepositoryMock();
    userService = new UserServiceMock();
    statsService = new StatsServiceMock();
    searchService = new SearchServiceMock();
    attendanceService = new AttendanceService(attendanceRepository, userService, statsService, searchService);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Test listAttendances', () => {
    it('Should list all attendances', async () => {
      const response = await attendanceService.listAttendances({});

      attendanceRepository.assertListAttendancesHasBeenCalledWith({});
      expect(response).toMatchObject(listAttendancesResponse);
    });

    it('Should list attendances filtered by userId', async () => {
      const filters = { userId: 'test' };
      const response = await attendanceService.listAttendances(filters);

      attendanceRepository.assertListAttendancesHasBeenCalledWith(filters);
      expect(response).toMatchObject(listAttendancesResponse);
    });
  });

  describe('Test searchAttendances', () => {
    it('Should do an elastic search of attendances', async () => {
      const search = 'test';
      const response = await attendanceService.searchAttendances(search);

      searchService.assertSearchAttendancesHasBeenCalledWith(search);
      expect(response).toMatchObject(searchAttendancesResponse);
    });
  });

  describe('Test createAttendance', () => {
    it('Should create an attendance', async () => {
      const response = await attendanceService.createAttendance(createAttendanceRequestMock);

      const props = {
        ...createAttendanceRequestMock,
        id: response.id.getValue(),
      };
      const attendance = new Attendance(props);
      const message = JSON.stringify({ event: Event.AttendanceCreated, userId: createAttendanceRequestMock.userId });

      attendanceRepository.assertSaveAttendanceHasBeenCalledWith(attendance);
      statsService.assertPublishMessageHasBeenCalledWith(message);
      searchService.assertIndexAttendanceHasBeenCalledWith(attendance);
      expect(response).toMatchObject(attendance);
    });

    it('Should throw a BadRequestException trying to create an attendance without userId', async () => {
      const invalidCreateAttendanceRequest = { ...createAttendanceRequestMock, userId: undefined };
      await expect(attendanceService.createAttendance(invalidCreateAttendanceRequest)).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create an attendance without startDate', async () => {
      const invalidCreateAttendanceRequest = { ...createAttendanceRequestMock, startDate: undefined };
      await expect(attendanceService.createAttendance(invalidCreateAttendanceRequest)).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create an attendance without endDate', async () => {
      const invalidCreateAttendanceRequest = { ...createAttendanceRequestMock, endDate: undefined };
      await expect(attendanceService.createAttendance(invalidCreateAttendanceRequest)).rejects.toThrow(BadRequestException);
    });

    it('Should throw a NotFoundException trying to create an attendance with a non-existent userId', async () => {
      jest.spyOn(userService, 'getUser').mockReturnValue(Promise.resolve(undefined));
      await expect(attendanceService.createAttendance(createAttendanceRequestMock)).rejects.toThrow(NotFoundException);
    });

    it('Should throw a BadRequestException trying to create an attendance with invalid startDate', async () => {
      const invalidCreateAttendanceRequest = { ...createAttendanceRequestMock, startDate: 'thisIsNotADate' };
      await expect(attendanceService.createAttendance(invalidCreateAttendanceRequest)).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create an attendance with invalid endDate', async () => {
      const invalidCreateAttendanceRequest = { ...createAttendanceRequestMock, endDate: 'thisIsNotADate' };
      await expect(attendanceService.createAttendance(invalidCreateAttendanceRequest)).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create an attendance with startDate in future', async () => {
      const invalidCreateAttendanceRequest = { ...createAttendanceRequestMock, startDate: '2032-10-10T15:00:00.000Z' };
      await expect(attendanceService.createAttendance(invalidCreateAttendanceRequest)).rejects.toThrow(BadRequestException);
    });

    it('Should throw a BadRequestException trying to create an attendance with endDate in future', async () => {
      const invalidCreateAttendanceRequest = { ...createAttendanceRequestMock, endDate: '2032-10-10T15:00:00.000Z' };
      await expect(attendanceService.createAttendance(invalidCreateAttendanceRequest)).rejects.toThrow(BadRequestException);
    });
  });

  describe('Test deleteAttendance', () => {
    it('Should delete an attendance', async () => {
      const id = 'attendanceId';
      const message = JSON.stringify({ event: Event.AttendanceDeleted, userId: attendancePropsMock.userId });
      await attendanceService.deleteAttendance(id);

      attendanceRepository.assertDeleteAttendanceHasBeenCalledWith(id);
      statsService.assertPublishMessageHasBeenCalledWith(message);
      searchService.assertDeleteAttendanceHasBeenCalledWith(id);
    });

    it('Should throw a NotFoundException trying to delete a non-existent attendance', async () => {
      jest.spyOn(attendanceRepository, 'deleteAttendance').mockReturnValue(Promise.resolve(false));

      await expect(attendanceService.deleteAttendance('nonExistentId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('Test deleteUserAttendances', () => {
    it('Should delete all attendances of a user', async () => {
      const userId = 'userId';
      await attendanceService.deleteUserAttendances(userId);

      attendanceRepository.assertDeleteUserAttendancesHasBeenCalledWith(userId);
      searchService.assertDeleteUserAttendancesHasBeenCalledWith(userId);
    });
  });
});
