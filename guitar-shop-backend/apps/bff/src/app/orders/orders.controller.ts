import { FindGuitarOrdersQuery, GuitarShopCreateOrderBffDto, GuitarShopCreateOrderDto, GuitarShopOrderRdo, JwtPayloadDto, MongoIdValidationPipe, TransformAndValidateDtoInterceptor, TransformAndValidateQueryInterceptor } from '@guitar-shop/shared-types';
import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { JwtAuthUsersGuard } from '../../assets/guard/jwt-auth-users.guard';
import { BffEnvInterface } from '../../assets/interface/bff-env.interface';

@Controller('orders')
export class OrdersController {
  private readonly logger: LoggerService = new Logger(OrdersController.name);

  private readonly ordersMicroserviceUrl: string;

  constructor(
    private readonly config: ConfigService<BffEnvInterface>,
  ) {
    this.ordersMicroserviceUrl = `http://${config.get("ORDERS_MICROSERVICE_HOST")}:${config.get("ORDERS_MICROSERVICE_PORT")}`;
  }


  @Post('/')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopCreateOrderBffDto))
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Req() req: Request & { user: JwtPayloadDto, }, @Body() dto: GuitarShopCreateOrderBffDto): Promise<GuitarShopOrderRdo> {
    const { id } = req.user;

    const dtoToOrdersMicroservice: GuitarShopCreateOrderDto = {
      creatorUserId: id,
      ...dto,
    };

    return (await axios.post(`${this.ordersMicroserviceUrl}${req.url}`, dtoToOrdersMicroservice)).data as GuitarShopOrderRdo;
  }

  @Get('/:orderId')
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.OK)
  async findOrderById(@Req() req: Request & { user: JwtPayloadDto, }, @Param('orderId', MongoIdValidationPipe) _orderId: string): Promise<GuitarShopOrderRdo> {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      throw new ForbiddenException('Доступ запрещен. Вы не являетесь администратором данного сервиса.');
    }

    return (await axios.get(`${this.ordersMicroserviceUrl}${req.url}`)).data as GuitarShopOrderRdo;
  }

  @Get('/')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarOrdersQuery))
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.OK)
  async findOrders(@Req() req: Request & { user: JwtPayloadDto, }): Promise<[GuitarShopOrderRdo | GuitarShopOrderRdo[], number]> {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      throw new ForbiddenException('Доступ запрещен. Вы не являетесь администратором данного сервиса.');
    }

    return (await axios.get(`${this.ordersMicroserviceUrl}${req.url}`)).data as [GuitarShopOrderRdo | GuitarShopOrderRdo[], number];
  }

  @Delete('/:orderId')
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.OK)
  async deleteOrderById(@Req() req: Request & { user: JwtPayloadDto, }, @Param('orderId', MongoIdValidationPipe) _orderId: string): Promise<string> {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      throw new ForbiddenException('Доступ запрещен. Вы не являетесь администратором данного сервиса.');
    }

    return (await axios.delete(`${this.ordersMicroserviceUrl}${req.url}`)).data as string;
  }

}
