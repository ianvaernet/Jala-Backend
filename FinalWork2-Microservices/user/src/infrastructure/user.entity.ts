import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
