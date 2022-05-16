import agent from 'supertest';
import { app } from '../../src/index';
import { mySQLDataSource } from '../../src/shared';

const request = agent(app);

beforeAll(async () => {
  await mySQLDataSource.initialize();
});
afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
});

describe('Game Controller', () => {
  it('Starts a new game', () => request.post('/api/game').expect(201));

  it('Get the current game state', () => request.get('/api/game').expect(200));

  it('Move a piece', () =>
    request
      .post('/api/game/move')
      .send({
        color: 'White',
        from: {
          file: 'E',
          rank: 2,
        },
        to: {
          file: 'E',
          rank: 4,
        },
      })
      .expect(200));
});
