import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const mySQLDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.DB_NAME : process.env.DB_NAME + '_test',
  entities: [__dirname + '/../../**/*.model.js'],
  synchronize: true,
  logging: false,
  dropSchema: process.env.NODE_ENV === 'test',
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
mySQLDataSource
  .initialize()
  .then(() => {
    // here you can start to work with your database
  }) // eslint-disable-next-line no-console
  .catch((error) => console.error(error));
