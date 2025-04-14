import * as path from 'path';
import * as dotenv from 'dotenv';

export const RUN_MODE = process.env.NODE_ENV ?? 'production';

dotenv.config({
  path: path.join(path.resolve(), '.env'),
});
dotenv.config({
  path: path.join(path.resolve(), `.env.${RUN_MODE}`),
  override: true,
});

export const PORT = +(process.env.PORT ?? 8080);
export const DB_NAME = process.env.DB_NAME as string;
export const DB_USER = process.env.DB_USER as string;
export const DB_PASS = process.env.DB_PASS as string;
export const DB_HOST = process.env.DB_HOST as string;
export const DB_PORT = +(process.env.DB_PORT ?? 3306);
export const CLIENT_EMAIL = process.env.CLIENT_EMAIL as string;
export const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
export const PROJECT_ID = process.env.PROJECT_ID as string;
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY as string;

export const SECRET_PASSWORD = process.env.SECRET_PASSWORD as string;
