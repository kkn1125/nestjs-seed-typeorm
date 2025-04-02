import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUser } from '@common/login-user.decorator';
import { RequireLogin } from '@common/require-login.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ stopAtFirstError: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @RequireLogin()
  @Get('me')
  findOne(@LoginUser() user: LoginUserData) {
    return this.usersService.findOne(user.pk);
  }

  @RequireLogin()
  @Patch('me')
  update(
    @LoginUser() user: LoginUserData,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user.pk, updateUserDto);
  }

  @RequireLogin()
  @Delete('me')
  remove(@LoginUser() user: LoginUserData) {
    return this.usersService.remove(user.pk);
  }
}
