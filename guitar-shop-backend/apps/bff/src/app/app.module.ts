import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { bffEnvValidateConfig } from '../assets/validate/bff-env.validate';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        resolve('apps', 'bff', 'environments', 'development.env'),
        resolve('apps', 'bff', 'environments', '*.env'),
      ],
      validate: bffEnvValidateConfig,
    }),
    UsersModule,
    ProductsModule,
    CommentsModule,
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
