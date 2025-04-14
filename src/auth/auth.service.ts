import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { UserSecret } from '@users/entities/user.secret.entity';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSecret)
    private readonly userSecretRepository: Repository<UserSecret>,
  ) {}

  hashPassword(password: string, salt?: string, iteration?: number) {
    if (!salt) salt = crypto.randomBytes(64).toString('base64');
    if (!iteration) iteration = 100000;

    const keyLength = 64;
    const digest = 'sha512';

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, iteration, keyLength, digest)
      .toString('base64');

    return {
      salt,
      iteration,
      hashedPassword: `${salt}:${hashedPassword}`,
    };
  }

  async tempLoginProcess({ email, password }: LoginDto) {
    const { salt, iteration, hashedPassword } = this.hashPassword(password);
    const user = await this.userRepository
      .createQueryBuilder('u')
      .where('email=:email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException('user not found');
    }

    await this.userSecretRepository
      .createQueryBuilder('us')
      .insert()
      .values({
        user: { id: user.id },
        salt,
        iteration,
        password: hashedPassword,
      })
      .orUpdate(['salt', 'iteration', 'password'], ['userId'])
      .execute();
  }

  async verifyPassword({ email, password }: LoginDto) {
    const user = await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.userSecret', 'us')
      .addSelect(['us.password'])
      .where('email=:email', { email })
      .getOne();
    if (!user || !user.userSecret) {
      throw new NotFoundException('user not found');
    }
    const { hashedPassword } = this.hashPassword(
      password,
      user.userSecret.salt,
      user.userSecret.iteration,
    );
    return hashedPassword === user.userSecret.password;
  }

  create(createAuthDto: LoginDto) {
    return 'This action adds a new auth';
  }
}
