import { Container } from 'inversify';
import { DI } from './types';
import { IUserRepository, IUserService, UserRepository, UserService } from './user';

export const DIContainer = new Container();

DIContainer.bind<IUserRepository>(DI.IUserRepository).to(UserRepository);
DIContainer.bind<IUserService>(DI.IUserService).to(UserService);
