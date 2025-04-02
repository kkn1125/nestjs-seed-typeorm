import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import databaseConf from './database.conf';
import { RUN_MODE } from './environments';
import firebaseConf from './firebase.conf';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${RUN_MODE}`],
      load: [firebaseConf, databaseConf],
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
