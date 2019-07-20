/**
 * settings.ts
 * This should be the ONLY file that accesses process.env.
 */
import * as dotenv from 'dotenv'

dotenv.config()

export default {
  name: 'type-api',
  port: parseInt(process.env.PORT, 10) || 3100,
  env: process.env.NODE_ENV || 'development',
  secretKey:
    process.env.SECRET_KEY ||
    'replace_this_key_474@itys*-gng^0phyeohag)qxa9$3v64+h^ze#',
  logLevel: process.env.LOG_LEVEL || 'warn',

  /**
   * Authentication
   */
  tokenExpirationPeriod: '7d',

  /**
   * Apollo Server settings
   */
  apolloEngineApiKey: process.env.ENGINE_API_KEY,
  apolloForcePlayground:
    process.env.APOLLO_FORCE_PLAYGROUND === 'true' || false,

  /**
   * Database
   *
   * These settings alter the structure and/or naming conventions of the database.
   * These should not be changed in production.
   *
   * More database settings are in /ormconfig.js
   */
  dbUrl: process.env.DATABASE_URL,
  dbIsSSL: process.env.DATABASE_IS_SSL,
  dbTestUrl: process.env.DATABASE_TEST_URL,
  dbTablePrefix: 'app_',
  dbSeeds: 'src/api/data/**/*.seed.ts',

  /**
   * Mailer
   *
   * This API uses nodemailer to run transports. Any SMTP transport will do.
   * If no environment variables are set, this defaults to a valid account at
   * http://ethereal.email
   */
  mailHost: process.env.MAIL_HOST || 'smtp.ethereal.email',
  mailPort: parseInt(process.env.MAIL_PORT, 10) || 587,
  mailSecure: process.env.MAIL_SECURE === 'true' || false,
  mailUser: process.env.MAIL_USER || 'tpll5wiiajplpxd6@ethereal.email',
  mailPass: process.env.MAIL_PASS || 'KPh5WESzRuQETtRgHq',
  mailFrom: process.env.MAIL_FROM || 'noreply@example.com',

  /**
   * Error logging
   *
   * This application supports multiple error logging services.
   * - Sentry
   * - Loggly
   */
  sentry: {
    logLevel: process.env.SENTRY_LOG_LEVEL,
    dsn: process.env.SENTRY_DSN,
  },
  loggly: {
    logLevel: process.env.LOGGLY_LOG_LEVEL,
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
  },
}
