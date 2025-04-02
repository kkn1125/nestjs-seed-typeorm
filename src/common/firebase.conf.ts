import { registerAs } from '@nestjs/config';
import {
  CLIENT_EMAIL,
  FIREBASE_API_KEY,
  PRIVATE_KEY,
  PROJECT_ID,
} from './environments';

const firebaseOption = {
  projectId: PROJECT_ID,
  privateKey: PRIVATE_KEY,
  clientEmail: CLIENT_EMAIL,
  apiKey: FIREBASE_API_KEY,
} as const;
export type FirebaseOption = (...args: any) => typeof firebaseOption;

export default registerAs('firebase', () => firebaseOption);
