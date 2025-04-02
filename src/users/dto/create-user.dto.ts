import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail({ allow_underscores: true })
  email: string = 'test@example.com';

  @IsStrongPassword({
    minLength: 5,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string = 'qweQQ!!1';
}
