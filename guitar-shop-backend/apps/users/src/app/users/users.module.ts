import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { GuitarShopUserEntity, GuitarShopUserSchema } from '../users-repository/entity/guitar-shop-user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GuitarShopUserEntity.name, schema: GuitarShopUserSchema, },
    ]),
    JwtModule,
  ],
})
export class UsersModule {}
