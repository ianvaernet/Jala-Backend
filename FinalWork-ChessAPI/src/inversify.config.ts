import { Container } from 'inversify';
import { DI } from './types';
import { BoardService, IBoardService } from './board';
import { GameRepository, GameService, IGameRepository, IGameService } from './game';
import { IPieceRepository, IPieceService, PieceRepository, PieceService } from './piece';

export const DIContainer = new Container();

DIContainer.bind<IBoardService>(DI.IBoardService).to(BoardService);
DIContainer.bind<IGameRepository>(DI.IGameRepository).to(GameRepository);
DIContainer.bind<IGameService>(DI.IGameService).to(GameService);
DIContainer.bind<IPieceRepository>(DI.IPieceRepository).to(PieceRepository);
DIContainer.bind<IPieceService>(DI.IPieceService).to(PieceService);
