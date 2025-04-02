import { registerAs } from '@nestjs/config';
import { Startup1743350327997 } from 'migration/1743350327997-startup';
import {
  DB_NAME as database,
  DB_HOST as host,
  DB_PASS as password,
  DB_PORT as port,
  RUN_MODE,
  DB_USER as username,
} from 'src/common/environments';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const IS_DEV = RUN_MODE === 'development';
const databaseOption: DataSourceOptions = {
  type: 'mariadb',
  host,
  port,
  username,
  password,
  database,
  logger: 'advanced-console',
  poolSize: 20,
  logging: IS_DEV ? ['query', 'error'] : ['error'],
  trace: IS_DEV,
  timezone: '+09:00',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: IS_DEV,
  // dropSchema: IS_DEV,
  migrations: [Startup1743350327997],
  migrationsRun: IS_DEV,
} as const;
export type DatabaseOption = (...args: any) => typeof databaseOption;

export const dataSource = new DataSource(databaseOption);

export default registerAs('database', () => databaseOption);
