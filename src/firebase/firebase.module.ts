import { CommonService } from '@common/common.service';
import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: (commonService: CommonService) => {
        const firebaseConfig = commonService.getConf('firebase');
        return admin.initializeApp({
          credential: admin.credential.cert(firebaseConfig),
        });
      },
      inject: [CommonService],
    },
    FirebaseService,
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
