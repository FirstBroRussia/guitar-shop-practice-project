import { UniqueNameEnum } from '@guitar-shop/shared-types';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersEnvInterface } from '../../assets/interface/users-env.interface';
import { LogoutUserEntity, LogoutUserSchema } from '../users-repository/entity/guitar-shop-logouted-user.entity';
import { GuitarShopUserEntity, GuitarShopUserSchema } from '../users-repository/entity/guitar-shop-user.entity';
import { UsersRepositoryService } from '../users-repository/users-repository.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GuitarShopUserEntity.name, schema: GuitarShopUserSchema, },
      { name: LogoutUserEntity.name, schema: LogoutUserSchema, },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<UsersEnvInterface>) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          algorithm: 'HS256',
          expiresIn: '2h',
        },
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: UniqueNameEnum.RabbitMqClient,
        inject: [ConfigService],
        useFactory: async (config: ConfigService<UsersEnvInterface>) => {
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
  controllers: [AuthController],
  providers: [UsersRepositoryService],
  exports: [UsersRepositoryService],
})
export class AuthModule {}
