import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const logger = new Logger('DatabaseConfig');
  
  const host = configService.get<string>('DB_HOST');
  const port = Number(configService.get<string>('DB_PORT'));
  const username = configService.get<string>('DB_USERNAME');
  const database = configService.get<string>('DB_DATABASE');
  
  logger.log(`Attempting to connect to database with:
    Host: ${host}
    Port: ${port}
    Username: ${username}
    Database: ${database}
    Node ENV: ${configService.get<string>('NODE_ENV')}
  `);

  // Ensure port is parsed as number
  if (isNaN(port)) {
    logger.error(`Invalid port number: ${configService.get('DB_PORT')}`);
    throw new Error('Database port must be a valid number');
  }

  const config: TypeOrmModuleOptions = {
    type: 'mssql',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: configService.get<string>('NODE_ENV') === 'development',
    options: {
      encrypt: false,
      trustServerCertificate: true,
      // enableArithAbort: true,
      // connectTimeout: 30000,
      // cancelTimeout: 30000,
      // packetSize: 4096,
      // useUTC: true,
    },
    pool: {
      max: 10,
      min: 1,
      idleTimeoutMillis: 30000
    },
    retryAttempts: 3,
    retryDelay: 3000,
    keepConnectionAlive: true,
  };

  logger.log(`Configuring database connection to ${config.host}:${config.port}`);
  
  return config;
}; 