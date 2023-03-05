/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { AllExceptionsFilter } from '@guitar-shop/core';
import { MicroserviceDefaultPortEnum } from '@guitar-shop/shared-types';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { NotifyEnvInterface } from './assets/interface/notify-env.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get<ConfigService<NotifyEnvInterface>>(ConfigService);
  const microserviceOptions = (() => {
    const user = configService.get<string>('RABBIT_USER');
    const password = configService.get<string>('RABBIT_PASSWORD');
    const host = configService.get<string>('RABBIT_HOST');
    const port = configService.get<number>('RABBIT_PORT');
    const queue = configService.get<string>('RABBIT_QUEUE');
    const url = `amqp://${user}:${[password]}@${host}:${port}`;

    return {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue: queue,
        persistent: true,
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    };
  })();
  app.connectMicroservice(microserviceOptions);
  app.startAllMicroservices();

  const port = process.env.PORT || MicroserviceDefaultPortEnum.NotifyMicroservicesPort;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
