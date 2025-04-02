import { Body, Controller, Inject, Post } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CommonService } from '@common/common.service';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('FIREBASE_ADMIN')
    private readonly firebaseApp: admin.app.App,
    private readonly commonService: CommonService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const firebaseConfig = this.commonService.getConf('firebase');
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;
    const response = await axios.post(url, {
      ...loginDto,
      returnSecureToken: true,
    });

    return response?.data?.idToken;
    // return this.authService.create(loginDto);
    // [x] 로그인 토큰 받고 응답하는거 해야함
  }
}
