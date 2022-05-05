import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { mySQLDataSource } from '../../shared';
import { Game, IGameRepository } from '../core';
import { GameEntity } from './game.entity';
import { GameMapper } from './game.mapper';

@injectable()
export class GameRepository implements IGameRepository {
  repo: Repository<GameEntity>;

  constructor() {
    this.repo = mySQLDataSource.getRepository(GameEntity);
  }

  async getGame() {
    const gameEntity = await this.repo.find();
    return gameEntity[0] ? GameMapper.toDomain(gameEntity[0]) : null;
  }

  async delete(game: Game) {
    const result = await this.repo.delete(game.getId());
    return result.affected ? true : false;
  }

  async save(game: Game) {
    await this.repo.save(GameMapper.toPersistence(game));
  }
}
