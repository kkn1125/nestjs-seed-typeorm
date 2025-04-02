import databaseConf from 'src/common/database.conf';
import { DataSource } from 'typeorm';

const config = databaseConf();

export const datasource = new DataSource(config);
