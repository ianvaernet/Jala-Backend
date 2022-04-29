import { Container } from 'inversify';
import { IUserRepository, IUserService, UserRepository, UserService } from './user';

export const DI = {
  IUserRepository: Symbol.for('IUserRepository'),
  IUserService: Symbol.for('IUserService'),
};

export const DIContainer = new Container();

DIContainer.bind<IUserRepository>(DI.IUserRepository).to(UserRepository);
DIContainer.bind<IUserService>(DI.IUserService).to(UserService);
