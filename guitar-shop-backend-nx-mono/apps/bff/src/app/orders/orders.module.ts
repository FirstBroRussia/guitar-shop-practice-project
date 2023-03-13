import { UniqueNameEnum } from '@guitar-shop/shared-types';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BffEnvInterface } from '../../assets/interface/bff-env.interface';

import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: UniqueNameEnum.RabbitMqClient,
        inject: [ConfigService],
        useFactory: async (config: ConfigService<BffEnvInterface>) => {
          const user = config.get<string>('RABBIT_USER');
          const password = config.get<string>('RABBIT_PASSWORD');
          const host = config.get<string>('RABBIT_HOST');
          const port = config.get<number>('RABBIT_PORT');
          const queue = config.get<string>('RABBIT_QUEUE');
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
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
