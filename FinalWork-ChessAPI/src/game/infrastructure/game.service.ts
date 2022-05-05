import { inject, injectable } from 'inversify';
import { IBoardService } from '../../board';
import { Game, GameStatus, IGameRepository, IGameService } from '../core';
import { DI } from '../../types';
import { NotFoundException } from '../../shared';

@injectable()
export class GameService implements IGameService {
  @inject(DI.IBoardService) private boardService: IBoardService;
  @inject(DI.IGameRepository) private gameRepository: IGameRepository;

  async getGame() {
    const game = await this.gameRepository.getGame();
    if (!game) throw new NotFoundException('Game not started');
    return game;
  }

  async startNewGame(): Promise<Game> {
    const currentGame = await this.gameRepository.getGame();
    if (currentGame) await this.gameRepository.delete(currentGame);
    const board = this.boardService.initiateBoard();
    const game = new Game(GameStatus.Ready, board, 'White');
    await this.gameRepository.save(game);
    board.setGame(game);
    await this.boardService.saveBoard(board);
    return game;
  }
}
