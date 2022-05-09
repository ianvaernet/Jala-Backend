import { inject, injectable } from 'inversify';
import { IBoardService } from '../../board';
import { Game, GameNotStartedException, GameStatus, IGameRepository, IGameService } from '../core';
import { DI } from '../../types';
import { Position } from '../../position';
import { Color } from '../../piece';

@injectable()
export class GameService implements IGameService {
  @inject(DI.IBoardService) private boardService: IBoardService;
  @inject(DI.IGameRepository) private gameRepository: IGameRepository;

  async getGame() {
    const game = await this.gameRepository.getGame();
    if (!game) throw new GameNotStartedException();
    return game;
  }

  async startNewGame(): Promise<Game> {
    const currentGame = await this.gameRepository.getGame();
    if (currentGame) await this.gameRepository.delete(currentGame);
    const board = this.boardService.initiateBoard();
    const game = new Game(board, GameStatus.Ready, 'White');
    await this.gameRepository.save(game);
    board.setGame(game);
    await this.boardService.saveBoard(board);
    return game;
  }

  async move(color: Color, from: Position, to: Position): Promise<Game> {
    const game = await this.getGame();
    game.move(color, from, to);
    await this.gameRepository.save(game);
    return game;
  }
}
