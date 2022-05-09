import { BoardMapper } from '../../board';
import { GameDTO } from '../API';
import { Game } from '../core';
import { GameEntity } from './game.entity';

export class GameMapper {
  static toDTO(game: Game) {
    return new GameDTO(game.getStatus(), BoardMapper.toDTO(game.getBoard()), game.getTurn());
  }

  static toDomain(gameEntity: GameEntity) {
    const board = BoardMapper.toDomain(gameEntity);
    const game = new Game(board, gameEntity.status, gameEntity.turn);
    game.setId(gameEntity.id);
    return game;
  }

  static toPersistence(game: Game) {
    const gameEntity = new GameEntity();
    if (game.getId()) gameEntity.id = game.getId();
    gameEntity.status = game.getStatus();
    gameEntity.turn = game.getTurn();
    // gameEntity.pieces = game
    //   .getBoard()
    //   .getGrid()
    //   .filter((position) => position.getOccupiedBy())
    //   .map((position) => PieceMapper.toPersistence(position.getOccupiedBy() as Piece));
    return gameEntity;
  }
}
