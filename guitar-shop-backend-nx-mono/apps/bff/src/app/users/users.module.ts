import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';

@Module({
  controllers: [
    AuthController,
    UsersController,
  ],
})
export class UsersModule {}
