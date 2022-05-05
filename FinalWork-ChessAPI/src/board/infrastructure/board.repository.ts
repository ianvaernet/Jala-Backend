// import { injectable } from 'inversify';
// import { Repository } from 'typeorm';
// import { mySQLDataSource } from '../../shared';
// import { BoardMapper } from '../API';
// import { IBoardRepository, Board } from '../core';
// import { BoardEntity } from './piece.entity';

// @injectable()
// export class BoardRepository implements IBoardRepository {
//   repo: Repository<BoardEntity>;

//   constructor() {
//     this.repo = mySQLDataSource.getRepository(BoardEntity);
//   }

//   async getBoard() {
//     const pieces = await this.repo.find();
//     return pieces.map((piece) => BoardMapper.toDomain(piece));
//   }

//   async save(piece: Board) {
//     await this.repo.save(BoardMapper.toPersistence(piece));
//   }
// }
