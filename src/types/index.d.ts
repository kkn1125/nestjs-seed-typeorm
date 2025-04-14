import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export declare global {
  //
  type CommonConfigType = 'database' | 'firebase' | 'secret';
  interface LoginUserData extends DecodedIdToken {
    pk: number;
  }
}

module 'Express' {
  interface Request {
    user: DecodedIdToken;
  }
}
