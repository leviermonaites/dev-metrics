require('module-alias/register');
import { DataSource } from 'typeorm'
import { databaseConfig } from './config';

export default new DataSource({
  type: 'postgres',
  migrations: [
    __dirname + "/migrations/*.*"
  ],
  schema: databaseConfig.databaseSchema,
  database: databaseConfig.databaseName,
  username: databaseConfig.databaseUser,
  password: databaseConfig.databasePass,
  port: databaseConfig.databasePort,
  host: databaseConfig.databaseHost
});