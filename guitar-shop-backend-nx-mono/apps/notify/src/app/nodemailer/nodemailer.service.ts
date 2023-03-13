import { GuitarShopNotifySendNewOrderDto, GuitarShopNotifySendNewUserDto } from '@guitar-shop/shared-types';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotifyEnvInterface } from '../../assets/interface/notify-env.interface';

import * as ejs from 'ejs';
import { resolve } from 'path';
import { getGuitarTypeStringForEJSComponents, getTransformDateForEJSComponents } from '@guitar-shop/core';

const NOTIFY_NEW_USER_SUBJECT_TEXT = 'Приветствуем вас наш новый покупатель!!!';
const NOTIFY_NEW_ORDER_SUBJECT_TEXT = 'Информация о новом заказе.';


@Injectable()
export class NodemailerService {
  private readonly logger: LoggerService = new Logger(NodemailerService.name);

  constructor (
    private readonly config: ConfigService<NotifyEnvInterface>,
    private readonly mailerService: MailerService,
  ) { }

  public async sendNotifyNewUser(dto: GuitarShopNotifySendNewUserDto) {
    const { email, username, password } = dto;

    const url = `${this.config.get('CURRENT_GUITAR_SHOP_DOMAIN')}/auth/login`;

    const options: ISendMailOptions = {
      to: email,
      subject: NOTIFY_NEW_USER_SUBJECT_TEXT,
      template: './add-new-user',
      context: {
        email,
        username,
        password,
        url,
      },
    };

    await this.mailerService.sendMail(options);
    this.logger.log(`Произведена отправка на email: ${email} нового пользователя информация для входа.`);
  }

  public async sendNotifyNewOrder(dto: GuitarShopNotifySendNewOrderDto) {
    const { adminEmail, order } = dto;
    const { createdAt } = order;

    ejs.renderFile(resolve('apps', 'notify', 'src', 'assets', 'template', 'add-new-order.ejs'), {
      backendUrl: this.config.get('BACKEND_URL'),
      order: order,
      date: getTransformDateForEJSComponents(createdAt),
      getGuitarTypeStringFn: getGuitarTypeStringForEJSComponents,
    }, (err, data) => {
      if (err) {
        throw err;
      } else {
        const options: ISendMailOptions = {
        to: adminEmail,
        subject: NOTIFY_NEW_ORDER_SUBJECT_TEXT,
        html: data
        };

        this.mailerService.sendMail(options);
        this.logger.log(`Произведена отправка email: ${adminEmail} администратора информации о новом заказе.`);
      }
    });
  }

}
