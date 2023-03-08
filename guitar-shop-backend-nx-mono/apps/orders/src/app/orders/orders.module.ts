import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OrdersRepositoryService } from '../orders-repository/orders-repository.service';
import { OrdersController } from './orders.controller';
import { GuitarShopOrderEntity, GuitarShopOrderSchema } from '../orders-repository/entity/guitar-shop-order.entity';
import { UniqueNameEnum } from '@guitar-shop/shared-types';
import { ConfigService } from '@nestjs/config';
import { OrdersEnvInterface } from '../../assets/interface/orders-env.interface';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GuitarShopOrderEntity.name, schema: GuitarShopOrderSchema, },
    ]),
    ClientsModule.registerAsync([
      {
        name: UniqueNameEnum.RabbitMqClient,
        inject: [ConfigService],
        useFactory: async (config: ConfigService<OrdersEnvInterface>) => {
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
  providers: [OrdersRepositoryService],
})
export class OrdersModule {}
