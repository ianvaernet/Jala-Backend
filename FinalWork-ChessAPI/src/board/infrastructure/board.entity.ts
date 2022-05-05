// import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { GameEntity } from '../../game';
// import { PieceEntity } from '../../piece';

// @Entity()
// export class BoardEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @OneToOne(() => GameEntity, (game) => game.board)
//   game: GameEntity;

//   @OneToMany(() => PieceEntity, (piece) => piece.board)
//   pieces: PieceEntity[];
// }
