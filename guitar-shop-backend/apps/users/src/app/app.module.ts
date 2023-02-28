import { resolve } from 'path';

import { getMongoConnectionString } from '@guitar-shop/core';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './src/users/users.module';
import { AuthModule } from './src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersEnvInterface } from '../assets/interface/users-env.interface';
import { usersEnvValidateConfig } from '../assets/validate/users-env.validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        resolve('apps', 'users', 'environments', 'development.env'),
        resolve('apps', 'users', 'environments', '*.env'),
      ],
      validate: usersEnvValidateConfig,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<UsersEnvInterface>) => ({
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
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
