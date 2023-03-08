import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { commentsEnvValidateConfig } from '../assets/validate/comments-env.validate';
import { CommentsEnvInterface } from '../assets/interface/comments-env.interface';
import { getMongoConnectionString } from '@guitar-shop/core';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        resolve('apps', 'comments', 'environments', 'development.env'),
        resolve('apps', 'comments', 'environments', '*.env'),
      ],
      validate: commentsEnvValidateConfig,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<CommentsEnvInterface>) => ({
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
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
