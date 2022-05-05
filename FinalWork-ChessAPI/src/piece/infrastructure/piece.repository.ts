import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { mySQLDataSource } from '../../shared';
import { PieceMapper } from '../API';
import { IPieceRepository, Piece } from '../core';
import { PieceEntity } from './piece.entity';

@injectable()
export class PieceRepository implements IPieceRepository {
  repo: Repository<PieceEntity>;

  constructor() {
    this.repo = mySQLDataSource.getRepository(PieceEntity);
  }

  async getRemainingPieces() {
    const pieces = await this.repo.find();
    return pieces.map((piece) => PieceMapper.toDomain(piece));
  }

  async deletePieceById(id: string) {
    const result = await this.repo.delete(id);
    return result.affected ? true : false;
  }

  async save(piece: Piece) {
    const { id } = await this.repo.save(PieceMapper.toPersistence(piece));
    piece.setId(id);
  }
}
