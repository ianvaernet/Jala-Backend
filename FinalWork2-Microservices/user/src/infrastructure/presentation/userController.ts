import { inject } from 'inversify';
import { Request, Response as ExpressResponse } from 'express';
import {
  controller,
  httpGet,
  BaseHttpController,
  httpPost,
  httpDelete,
  request,
  response,
  requestParam,
  httpPut,
} from 'inversify-express-utils';
import { UserService } from '../../application/userService';
import { DI } from '../../types';
import { UserMapper } from '../userMapper';
import { Response } from './response';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(@inject(DI.UserService) private userService: UserService) {
    super();
  }

  @httpGet('/')
  private async listUsers(@request() req: Request, @response() res: ExpressResponse) {
    const users = await this.userService.listUsers(req.query);
    const userDtos = users.map((user) => UserMapper.toResponseUser(user));
    Response.ok(res, userDtos);
  }

  @httpPost('/')
  private async createUser(@request() req: Request, @response() res: ExpressResponse) {
    const user = await this.userService.createUser(req.body);
    const userDto = UserMapper.toResponseUser(user);
    Response.created(res, userDto, 'User successfully created');
  }

  @httpPut('/:id')
  private async updateUser(@request() req: Request, @response() res: ExpressResponse) {
    const user = await this.userService.updateUser(req.params.id, req.body);
    const userDto = UserMapper.toResponseUser(user);
    Response.created(res, userDto, 'User successfully updated');
  }

  @httpGet('/:id')
  private async getUser(@requestParam('id') id: string, @response() res: ExpressResponse) {
    const user = await this.userService.getUser(id, true);
    const userDto = UserMapper.toResponseUser(user);
    Response.ok(res, userDto);
  }

  @httpDelete('/:id')
  private async deleteUser(@requestParam('id') id: string, @response() res: ExpressResponse) {
    await this.userService.deleteUser(id);
    Response.ok(res, null, 'User successfully deleted');
  }
}
