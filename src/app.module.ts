import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErcotMaster } from './entities/ercot-master.entity';
import { ErcotMasterController } from './controllers/ercot-master.controller';
import { ErcotMasterService } from './services/ercot-master.service';
import { getDatabaseConfig } from './config/database.config';
import { Customer } from './entities/customer.entity';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';

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
        entities: [ErcotMaster, Customer],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ErcotMaster, Customer]),
  ],
  controllers: [ErcotMasterController, CustomerController],
  providers: [ErcotMasterService, CustomerService ],
})
export class AppModule {}
