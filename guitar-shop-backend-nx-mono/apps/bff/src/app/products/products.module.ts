import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { ProductsController } from './products.controller';

import { BffEnvInterface } from '../../assets/interface/bff-env.interface';
import { getMulterOptions } from '../../assets/multer/get-multer-options';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<BffEnvInterface>) =>
        getMulterOptions(resolve('apps', 'bff', `${config.get('UPLOAD_DIR')}`)),
    }),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
