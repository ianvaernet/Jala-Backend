import { inject } from 'inversify';
import { Request, Response as ExpressResponse } from 'express';
import { controller, httpGet, BaseHttpController, httpPost, httpDelete, request, response, requestParam } from 'inversify-express-utils';
import { AttendanceService } from '../../application/attendanceService';
import { DI } from '../../types';
import { AttendanceMapper } from '../attendanceMapper';
import { Response } from './response';

@controller('/attendances')
export class AttendanceController extends BaseHttpController {
  constructor(@inject(DI.AttendanceService) private attendanceService: AttendanceService) {
    super();
  }

  @httpGet('/')
  private async listAttendance(@request() req: Request, @response() res: ExpressResponse) {
    const attendances = await this.attendanceService.listAttendances();
    Response.ok(res, attendances);
  }

  @httpPost('/')
  private async createAttendance(@request() req: Request, @response() res: ExpressResponse) {
    const attendance = await this.attendanceService.createAttendance(req.body);
    const attendanceDto = AttendanceMapper.toResponseDto(attendance);
    Response.ok(res, attendanceDto, 'Attendance successfully registered');
  }

  @httpDelete('/:id')
  private async deleteAttendance(@requestParam('id') id: string, @response() res: ExpressResponse) {
    await this.attendanceService.deleteAttendance(id);
    Response.ok(res, null, 'Attendance successfully deleted');
  }
}
