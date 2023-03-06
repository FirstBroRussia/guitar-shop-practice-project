/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';

import { AllExceptionsFilter } from '@guitar-shop/core';
import { MicroserviceDefaultPortEnum } from '@guitar-shop/shared-types';

import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';
import { BffEnvInterface } from './assets/interface/bff-env.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const config = app.get(ConfigService<BffEnvInterface>);
  app.use('/api/products/upload', express.static(resolve('apps', 'bff', `${config.get('UPLOAD_DIR')}`)));

  const port = process.env.PORT || MicroserviceDefaultPortEnum.BffMicroservicePort;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
