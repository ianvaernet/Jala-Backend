import { inject } from 'inversify';
import { Request, Response as ExpressResponse } from 'express';
import { controller, httpGet, BaseHttpController, httpPost, httpDelete, request, response, requestParam } from 'inversify-express-utils';
import { AttendanceService } from '../../application/attendanceService';
import { DI, ListAttendancesFilters } from '../../types';
import { AttendanceMapper } from '../attendanceMapper';
import { Response } from './response';

@controller('/')
export class AttendanceController extends BaseHttpController {
  constructor(@inject(DI.AttendanceService) private attendanceService: AttendanceService) {
    super();
  }

  @httpGet('attendances')
  private async listAttendance(@request() req: Request, @response() res: ExpressResponse) {
    const filters: ListAttendancesFilters = {};
    if (req.query.userId) {
      filters.userId = req.query.userId as string;
    }
    const attendances = await this.attendanceService.listAttendances(filters);
    Response.ok(res, attendances);
  }

  @httpPost('attendances')
  private async createAttendance(@request() req: Request, @response() res: ExpressResponse) {
    const attendance = await this.attendanceService.createAttendance(req.body);
    const attendanceDto = AttendanceMapper.toResponseDto(attendance);
    Response.ok(res, attendanceDto, 'Attendance successfully registered');
  }

  @httpDelete('attendances/:id')
  private async deleteAttendance(@requestParam('id') id: string, @response() res: ExpressResponse) {
    await this.attendanceService.deleteAttendance(id);
    Response.ok(res, null, 'Attendance successfully deleted');
  }

  @httpDelete('users/:userId/attendances')
  private async deleteUserAttendances(@requestParam('userId') userId: string, @response() res: ExpressResponse) {
    await this.attendanceService.deleteUserAttendances(userId);
    Response.ok(res, null, "User's attendances successfully deleted");
  }
}
