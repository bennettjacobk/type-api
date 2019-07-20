import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { logger } from '../logger'
import { TypeORMLogger } from '../logger/typeorm'
import settings from '../settings'
import { permissionValuesCheck } from './hooks/permissionValuesCheck'

const isTestDb: boolean =
  settings.env === 'test' && settings.dbTestUrl ? true : false

export const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  url: isTestDb ? settings.dbTestUrl : settings.dbUrl,

  // only drop schema in test environment; this keeps tests separate
  dropSchema: isTestDb,

  synchronize: false,
  ssl: settings.dbIsSSL,
  migrationsRun: true,
  entityPrefix: settings.dbTablePrefix,
  entities: [__dirname + '/../../**/*.entity.?s'],
  migrations: [__dirname + '/../../api/migrations/**/*.?s'],
  subscribers: [__dirname + '/../../api/subscribers/**/*.?s'],

  logging: 'all',
  logger: new TypeORMLogger(),
}

/**
 * @export
 * @class Database
 */
export default class Database {
  public connection: Connection

  public async init(callback?: () => void) {
    if (!settings.dbUrl) {
      logger.warn('No DATABASE_URL environment variable is set.')
    }

    logger.silly(
      `Opening connection to database using the "${settings.env}" environment`,
    )
    logger.silly('Database connection options:')
    logger.silly(connectionOptions)
    this.connection = await createConnection(connectionOptions)

    /**
     * Hooks
     * These functions will run upon each connect to the database.
     */
    await permissionValuesCheck()

    if (typeof callback === 'function') {
      callback()
    }
  }

  public async close(callback?: () => void) {
    await this.connection.close()

    if (typeof callback === 'function') {
      callback()
    }
  }
}
