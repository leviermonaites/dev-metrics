export const databaseConfig = {
  databaseUser: process.env.DATABASE_USER ?? 'postgres',
  databasePass: process.env.DATABASE_PASS ?? 'secret',
  databaseHost: process.env.DATABASE_HOST ?? 'localhost',
  databasePort: Number.parseInt(process.env.DATABASE_PORT ?? '5432'),
  databaseName: process.env.DATABASE_NAME ?? 'dev-metrics',
  databaseSchema: process.env.DATABASE_SCHEMA ?? 'dev-metrics-lifecycle'
}
