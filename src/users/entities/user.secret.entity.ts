import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserSecret {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    type: 'varchar',
    length: 250,
    default: '',
    comment: '비밀번호 암호화',
    select: false,
  })
  password: string;

  @Column({ type: 'varchar', length: 120, default: '', comment: '암호화 salt' })
  salt: string;

  @Column({ type: 'int', default: 100000, comment: '암호화 iteration' })
  iteration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.userSecret, { cascade: true })
  @JoinColumn()
  user: User;
}
