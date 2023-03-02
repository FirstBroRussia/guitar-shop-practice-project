import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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
  ],
  controllers: [AuthController],
  providers: [UsersRepositoryService],
  exports: [],
})
export class AuthModule {}
