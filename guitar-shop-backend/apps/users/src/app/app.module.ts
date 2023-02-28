import { Module } from '@nestjs/common';
import { UsersModule } from './src/users/users.module';
import { AuthModule } from './src/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
