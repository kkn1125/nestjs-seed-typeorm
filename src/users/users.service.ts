import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as admin from 'firebase-admin';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('FIREBASE_ADMIN')
    private readonly firebaseApp: admin.app.App,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create({ username, email, password }: CreateUserDto) {
    try {
      const userRecord = await this.firebaseApp
        .auth()
        .createUser({ email, password, displayName: username });
      const { uid } = userRecord;
      const user = this.userRepo.create();
      user.uid = uid;
      user.email = email;
      user.username = username;
      return this.userRepo.save(user);
    } catch (error) {
      //
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
