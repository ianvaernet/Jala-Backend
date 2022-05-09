import agent from 'supertest';
import { app } from '../../src/index';
import { mySQLDataSource } from '../../src/shared';

const request = agent(app);

beforeAll(async () => await mySQLDataSource.initialize());

describe('Game Controller', () => {
  it('Get the current game state', () => request.get('/api/game').expect(200));
});
