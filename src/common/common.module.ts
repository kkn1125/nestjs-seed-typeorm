import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonService } from './common.service';
import databaseConf from './database.conf';
import { RUN_MODE } from './environments';
import firebaseConf from './firebase.conf';
import secretConf from './secret.conf';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${RUN_MODE}`],
      load: [firebaseConf, databaseConf, secretConf],
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
