import { getMongoConnectionString } from '@guitar-shop/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';
import { OrdersEnvInterface } from '../assets/interface/orders-env.interface';
import { ordersEnvValidateConfig } from '../assets/validate/orders-env.validate';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        resolve('apps', 'orders', 'environments', 'development.env'),
        resolve('apps', 'orders', 'environments', '*.env'),
      ],
      validate: ordersEnvValidateConfig,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<OrdersEnvInterface>) => ({
        uri: getMongoConnectionString({
          host: config.get('MONGO_DB_HOST'),
          port: config.get('MONGO_DB_PORT'),
          databaseName: config.get('MONGO_DB_NAME'),
          authDatabase: config.get('MONGO_AUTH_BASE'),
          username: config.get('MONGO_DB_USERNAME'),
          password: config.get('MONGO_DB_PASSWORD'),
        }),
      }),
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
