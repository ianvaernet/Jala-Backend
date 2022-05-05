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

  // @OneToOne(() => BoardEntity, (board) => board.game)
  // @JoinColumn()
  // board: BoardEntity;

  @OneToMany(() => PieceEntity, (piece) => piece.game)
  pieces: PieceEntity[];
}
