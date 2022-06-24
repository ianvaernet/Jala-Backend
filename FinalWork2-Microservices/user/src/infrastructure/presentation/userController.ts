import { inject } from 'inversify';
import { Request, Response } from 'express';
import { controller, httpGet, BaseHttpController, httpPost, httpDelete, request, response, requestParam } from 'inversify-express-utils';
import { UserService } from '../../application/userService';
import { DI } from '../../types';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(@inject(DI.UserService) private userService: UserService) {
    super();
  }

  @httpGet('/')
  public async listUsers(@request() req: Request, @response() res: Response) {
    const users = this.userService.listUsers();
    res.status(200).json(users);
  }
}
