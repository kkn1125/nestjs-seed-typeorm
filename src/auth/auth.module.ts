import { FirebaseModule } from '@/firebase/firebase.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { UserSecret } from '@users/entities/user.secret.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSecret]), FirebaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
