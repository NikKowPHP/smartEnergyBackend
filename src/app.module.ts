import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErcotMaster } from './entities/ercot-master.entity';
import { ErcotMasterService } from './services/ercot-master.service';
import { ErcotMasterController } from './controllers/ercot-master.controller';
import { getDatabaseConfig } from './config/database.config';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ErcotMaster]),
  ],
  controllers: [ErcotMasterController, HealthController],
  providers: [ErcotMasterService],
})
export class AppModule {}
