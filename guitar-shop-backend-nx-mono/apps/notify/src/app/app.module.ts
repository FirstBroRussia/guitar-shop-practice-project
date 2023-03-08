import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongoConnectionString } from '@guitar-shop/core';

import { NodemailerModule } from './nodemailer/nodemailer.module';
import { NotifyEnvInterface } from '../assets/interface/notify-env.interface';
import { notifyEnvValidateConfig } from '../assets/validate/notify-env.validate';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        resolve('apps', 'notify', 'environments', 'development.env'),
        resolve('apps', 'notify', 'environments', '*.env'),
      ],
      validate: notifyEnvValidateConfig,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<NotifyEnvInterface>) => ({
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
    NodemailerModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
  exports: [NodemailerModule],
})
export class AppModule {}
