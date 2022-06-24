import 'reflect-metadata';
import { Server } from './server';
import { mySQLDataSource } from './infrastructure/mySqlDatasource';

const start = async () => {
  await mySQLDataSource.initialize();
  new Server().start();
};

start();
