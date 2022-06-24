import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const mySQLDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV !== 'test' ? process.env.DB_NAME : process.env.DB_NAME + '_test',
  entities: [__dirname + '../../**/*.entity.{ts,js}'],
  synchronize: true,
  migrationsRun: false,
  logging: false,
});
