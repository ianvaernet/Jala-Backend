import { inject } from 'inversify';
import { Request, Response } from 'express';
import { controller, httpGet, BaseHttpController, httpPost, httpDelete, request, response, requestParam } from 'inversify-express-utils';
import { UserService } from '../../application/userService';
import { DI } from '../../types';
import { UserMapper } from '../userMapper';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(@inject(DI.UserService) private userService: UserService) {
    super();
  }

  @httpGet('/')
  private async listUsers(@request() req: Request, @response() res: Response) {
    const users = await this.userService.listUsers(req.query);
    const userDtos = users.map((user) => UserMapper.toResponseUser(user));
    res.status(200).json({ data: userDtos });
  }

  @httpPost('/')
  private async createUser(@request() req: Request, @response() res: Response) {
    const user = await this.userService.createUser(req.body);
    const userDto = UserMapper.toResponseUser(user);
    res.status(201).json({ data: userDto, message: 'User successfully created' });
  }

  @httpGet('/:id')
  private async getUser(@requestParam('id') id: string, @response() res: Response) {
    const user = await this.userService.getUser(id, true);
    const userDto = UserMapper.toResponseUser(user);
    res.status(200).json({ data: userDto });
  }

  @httpDelete('/:id')
  private async deleteUser(@requestParam('id') id: string, @response() res: Response) {
    await this.userService.deleteUser(id);
    res.status(200).json({ message: 'User successfully deleted' });
  }
}
