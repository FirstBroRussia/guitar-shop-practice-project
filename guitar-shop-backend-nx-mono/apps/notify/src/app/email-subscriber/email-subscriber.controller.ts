import { GuitarShopNotifySendNewOrderDto, GuitarShopNotifySendNewUserDto, RabbitMqEventEnum } from '@guitar-shop/shared-types';
import { Controller, Logger, LoggerService } from '@nestjs/common';
import { EventPattern, Transport } from '@nestjs/microservices';
import { NodemailerService } from '../nodemailer/nodemailer.service';


@Controller()
export class EmailSubscriberController {
  private readonly logger: LoggerService = new Logger(EmailSubscriberController.name);

  constructor (
    private readonly nodemailerService: NodemailerService,
  ) { }


  @EventPattern(RabbitMqEventEnum.AddNewUser, Transport.RMQ)
  async newUserSubscriber(dto: GuitarShopNotifySendNewUserDto) {
    await this.nodemailerService.sendNotifyNewUser(dto);
  }

  @EventPattern(RabbitMqEventEnum.AddNewOrder, Transport.RMQ)
  async newOrderSubscriber(dto: GuitarShopNotifySendNewOrderDto) {
    await this.nodemailerService.sendNotifyNewOrder(dto);
  }

}
