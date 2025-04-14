/* test */
import { CommonService } from '@common/common.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';
import * as JWT from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commonService: CommonService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const secretConfig = this.commonService.getConf('secret');

    try {
      /* 데이터베이스 우선 조회 */
      const isVerified = await this.authService.verifyPassword(loginDto);

      if (!isVerified) {
        throw new BadRequestException('invalid user informations');
      }

      const token = JWT.sign(
        {
          email: loginDto.email,
        },
        secretConfig.password,
        { algorithm: 'HS256' },
      );

      return {
        token,
      };
    } catch (error) {
      const firebaseConfig = this.commonService.getConf('firebase');
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;
      const response = await axios.post(url, {
        ...loginDto,
        returnSecureToken: true,
      });

      /* 비밀번호 인터셉트 + 데이터베이스 저장 */
      await this.authService.tempLoginProcess(loginDto);
      console.log('Database');
      return { token: response.data.idToken as string };
    }
    // return this.authService.create(loginDto);
    // [x] 로그인 토큰 받고 응답하는거 해야함
  }
}
