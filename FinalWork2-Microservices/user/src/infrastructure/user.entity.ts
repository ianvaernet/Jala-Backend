import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  fullName: string;

  @Column()
  totalAttendance: number;
}
