import { resolve } from 'path';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotifyEnvInterface } from '../../assets/interface/notify-env.interface';
import { NodemailerService } from './nodemailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<NotifyEnvInterface>) => ({
        transport: {
          host: config.get<string>("MAIL_SMTP_HOST"),
          port: config.get<number>("MAIL_SMTP_PORT"),
          secure: false,
          auth: {
            user: config.get<string>("MAIL_USERNAME"),
            pass: config.get<string>("MAIL_PASSWORD")
          }
        },
        defaults: {
          from: config.get<string>("MAIL_FROM"),
        },
        template: {
          dir: resolve('apps', 'notify', 'src', 'assets', 'template'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
    }),
  ],
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
