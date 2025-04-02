import { User } from '@users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '유저 PK' })
  userId: number;

  @Column({ type: 'varchar', length: 50, comment: '제목' })
  title: string;

  @Column({ type: 'longtext', comment: '본문' })
  content: string;

  @CreateDateColumn({ type: 'datetime', comment: '생성 일시' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '수정 일시' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', comment: '삭제 일시', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.boards)
  user: User;
}
