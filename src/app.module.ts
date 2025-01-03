import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErcotMaster } from './entities/ercot-master.entity';
import { ErcotMasterController } from './controllers/ercot-master.controller';
import { ErcotMasterService } from './services/ercot-master.service';
import { getDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...getDatabaseConfig(configService),
        entities: [ErcotMaster],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ErcotMaster]),
  ],
  controllers: [ErcotMasterController],
  providers: [ErcotMasterService],
})
export class AppModule {}
