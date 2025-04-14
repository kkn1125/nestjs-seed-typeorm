import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { DatabaseOption } from './database.conf';
import { FirebaseOption } from './firebase.conf';
import { SecretOption } from './secret.conf';

type Return<T> = T extends 'database'
  ? ConfigType<DatabaseOption>
  : T extends 'firebase'
    ? ConfigType<FirebaseOption>
    : T extends 'secret'
      ? ConfigType<SecretOption>
      : never;

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}

  getConf<Type extends CommonConfigType>(type: Type): Return<Type> {
    return this.configService.get<Return<Type>>(type, {
      infer: true,
    }) as Return<Type>;
  }
}
