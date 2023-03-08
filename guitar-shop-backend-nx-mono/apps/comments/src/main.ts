/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { MicroserviceDefaultPortEnum } from '@guitar-shop/shared-types';
import { AllExceptionsFilter } from '@guitar-shop/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.enableCors({
    origin: [
      `http://localhost:${MicroserviceDefaultPortEnum.BffMicroservicePort}`,
    ],
  });

  const port = process.env.PORT || MicroserviceDefaultPortEnum.CommentsMicroservicePort;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();