import { registerAs } from '@nestjs/config';
import { SECRET_PASSWORD } from './environments';

const secretOption = {
  password: SECRET_PASSWORD,
} as const;
export type SecretOption = (...args: any) => typeof secretOption;

export default registerAs('secret', () => secretOption);
