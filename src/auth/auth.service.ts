import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: LoginDto) {
    return 'This action adds a new auth';
  }
}
