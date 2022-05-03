import agent from 'supertest';
import { app } from '../../../index';
import { mySQLDataSource } from '../../../shared';

const request = agent(app);

beforeAll(async () => await mySQLDataSource.initialize());

describe('User Controller', () => {
  it('Should create a new user', () =>
    request
      .post('/api/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'user@test.com',
        password: 'testuser',
      })
      .expect(201));

  it('Should list all existing users', () => request.get('/api/users').expect(200));

  it('Should get a Not Found exception trying to get an inexisting user by ID', () => request.get('/api/users/123').expect(404));
});
