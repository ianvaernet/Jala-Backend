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
  private async listAttendance(@request() req: Request, @response() res: ExpressResponse) {}

  @httpPost('/')
  private async createAttendance(@request() req: Request, @response() res: ExpressResponse) {}

  @httpDelete('/:id')
  private async deleteAttendance(@requestParam('id') id: string, @response() res: ExpressResponse) {}
}
