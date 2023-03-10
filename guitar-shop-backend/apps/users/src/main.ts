/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { AllExceptionsFilter } from '@guitar-shop/core';
import { MicroserviceDefaultPost } from '@guitar-shop/shared-types';
import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || MicroserviceDefaultPost.UsersMicroservice;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
