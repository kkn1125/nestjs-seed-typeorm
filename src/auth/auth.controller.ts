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
  }
}
