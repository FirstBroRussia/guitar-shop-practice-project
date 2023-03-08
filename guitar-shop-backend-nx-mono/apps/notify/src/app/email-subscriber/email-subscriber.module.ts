import { Module } from '@nestjs/common';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { EmailSubscriberController } from './email-subscriber.controller';

@Module({
  imports: [
    NodemailerModule,
  ],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule {}
