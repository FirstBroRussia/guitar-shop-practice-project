import { fillDTO } from '@guitar-shop/core';
import { FindGuitarOrdersQuery, GuitarShopCreateOrderDto, GuitarShopOrderRdo, MongoIdValidationPipe, TransformAndValidateDtoInterceptor, TransformAndValidateQueryInterceptor } from '@guitar-shop/shared-types';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { OrdersRepositoryService } from '../orders-repository/orders-repository.service';

@Controller('orders')
export class OrdersController {
  private readonly logger: LoggerService = new Logger(OrdersController.name);

  constructor (
    private readonly ordersRepository: OrdersRepositoryService,
  ) { }


  @Post('/')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopCreateOrderDto))
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() dto: GuitarShopCreateOrderDto): Promise<GuitarShopOrderRdo> {
    return fillDTO(GuitarShopOrderRdo, await this.ordersRepository.createOrder(dto));
  }

  @Get('/:orderId')
  @HttpCode(HttpStatus.OK)
  async findOrderById(@Param('orderId', MongoIdValidationPipe) orderId: string): Promise<GuitarShopOrderRdo> {
    return fillDTO(GuitarShopOrderRdo, await this.ordersRepository.findOrderById(orderId));
  }

  @Get('/')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarOrdersQuery))
  @HttpCode(HttpStatus.OK)
  async findOrders(@Query() query: FindGuitarOrdersQuery): Promise<[GuitarShopOrderRdo | GuitarShopOrderRdo[], number]> {
    const [orders, count] = await this.ordersRepository.findOrders(query);

    return [fillDTO(GuitarShopOrderRdo, orders), count];
  }

  @Delete('/:orderId')
  @HttpCode(HttpStatus.OK)
  async deleteOrderById(@Param('orderId', MongoIdValidationPipe) orderId: string): Promise<string> {
    await this.ordersRepository.deleteOrder(orderId);

    return `Удаление заказа с ID: ${orderId} прошло успешно`;
  }

}
