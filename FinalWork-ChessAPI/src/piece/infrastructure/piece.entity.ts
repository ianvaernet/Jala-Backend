import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameEntity } from '../../game';
import { File, Rank } from '../../position';
import { Color } from '../core';

export type PieceType = 'Pawn' | 'Rook' | 'Knight' | 'Bishop' | 'Queen' | 'King';

@Entity()
export class PieceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { nullable: false })
  position: { file: File; rank: Rank };

  @Column({ nullable: false })
  color: Color;

  @Column({ nullable: false })
  type: PieceType;

  @ManyToOne(() => GameEntity, (game) => game.pieces, { nullable: false, onDelete: 'CASCADE' })
  game: GameEntity;
}
