import { DataSource } from 'typeorm'
import { databaseConfig } from './config';

export const getDatasource = async () => {
  const datasource = new DataSource({
    database: databaseConfig.databaseName,
    username: databaseConfig.databaseUser,
    password: databaseConfig.databasePass,
    port: databaseConfig.databasePort,
    host: databaseConfig.databaseHost,
    type: 'postgres',
  });
  await datasource.initialize();
  return datasource
}