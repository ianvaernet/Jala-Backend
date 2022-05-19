import { inject, injectable } from 'inversify';
import { IBoardService } from '../../board';
import { Game, GameNotStartedException, IGameRepository, IGameService } from '../core';
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
    const game = Game.startNewGame();
    await this.saveGame(game);
    return game;
  }

  async move(color: Color, from: Position, to: Position): Promise<Game> {
    const game = await this.getGame();
    game.move(color, from, to);
    await this.saveGame(game);
    return game;
  }

  private async saveGame(game: Game) {
    await this.gameRepository.save(game);
    await this.boardService.saveBoard(game.getBoard());
  }
}
