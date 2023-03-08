import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { ProductsEnvInterface } from '../assets/interface/products-env.interface';
import { productsEnvValidateConfig } from '../assets/validate/product-env.validate';
import GuitarShopProductCardEntity from './products/entity/guitar-shop-product-card.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        resolve('apps', 'products', 'environments', 'development.env'),
        resolve('apps', 'products', 'environments', '*.env'),
      ],
      validate: productsEnvValidateConfig,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<ProductsEnvInterface>) => ({
        type: 'postgres', //
        username: config.get<string>('POSTGRES_DB_USERNAME'), //
        password: config.get<string>('POSTGRES_DB_PASSWORD'), //
        database: config.get<string>('POSTGRES_DB_NAME'), //
        host: config.get<string>('POSTGRES_DB_HOST'), //
        port: config.get<number>('POSTGRES_DB_PORT'), //
        entities: [GuitarShopProductCardEntity],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
