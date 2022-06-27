import 'reflect-metadata';
import { Server } from './server';
import { mongoDatasource } from './infrastructure/mongoDatasource';

const start = async () => {
  await mongoDatasource.initialize();
  new Server().start();
};

start();
