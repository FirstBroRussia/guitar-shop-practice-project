import { GuitarShopNotifySendNewOrderDto, GuitarShopNotifySendNewUserDto, GuitarShopOrderRdo } from '@guitar-shop/shared-types';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotifyEnvInterface } from '../../assets/interface/notify-env.interface';

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
    const { products, totalCount, totalPrice, createdAt } = order;


    const options: ISendMailOptions = {
      to: adminEmail,
      subject: NOTIFY_NEW_ORDER_SUBJECT_TEXT,
      template: './add-new-order',
      context: {
        products,
        totalCount,
        totalPrice,
        createdAt,
      },
    };

    await this.mailerService.sendMail(options);
    this.logger.log(`Произведена отправка email: ${adminEmail} администратора информации о новом заказе.`);
  }

}
