import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Color, PieceEntity } from '../../piece';
import { GameStatus } from '../core';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: GameStatus;

  @Column()
  turn: Color;

  @OneToMany(() => PieceEntity, (piece) => piece.game, { eager: true, cascade: true })
  pieces: PieceEntity[];
}
