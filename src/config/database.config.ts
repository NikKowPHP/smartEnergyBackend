import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mssql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false, // Set to false in production
  logging: configService.get<string>('NODE_ENV') === 'development',
  options: {
    encrypt: false, // For Azure SQL, set to true
    trustServerCertificate: true,
  },
}); 