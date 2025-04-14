import { Board } from '@boards/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSecret } from './user.secret.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, comment: 'Firebase UID' })
  uid: string;

  @Column({ type: 'varchar', length: 100, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 20, comment: '유저 명' })
  username: string;

  @CreateDateColumn({ type: 'datetime', comment: '생성 일시' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '수정 일시' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', comment: '삭제 일시', nullable: true })
  deletedAt: Date | null;

  @OneToOne(() => UserSecret, (userSecret) => userSecret.user)
  userSecret: UserSecret;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];
}
