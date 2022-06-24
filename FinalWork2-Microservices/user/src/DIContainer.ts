import { Container } from 'inversify';
import { UserRepository } from './application/userRepository';
import { UserService } from './application/userService';
import { UserController } from './infrastructure/presentation/userController';
import { UserTypeOrmRepository } from './infrastructure/userTypeOrmRepository';
import { DI } from './types';

export const DIContainer = new Container();

DIContainer.bind<UserController>(DI.UserController).to(UserController);
DIContainer.bind<UserService>(DI.UserService).to(UserService);
DIContainer.bind<UserRepository>(DI.UserRepository).to(UserTypeOrmRepository);
