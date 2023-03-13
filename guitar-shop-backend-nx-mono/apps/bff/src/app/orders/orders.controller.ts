import { FindGuitarOrdersQuery, GuitarShopCreateOrderBffDto, GuitarShopCreateOrderDto, GuitarShopFindProductsInterMicroserviceDto, GuitarShopOrderBffRdo, GuitarShopOrderProductItemInterface, GuitarShopOrderRdo, GuitarShopProductCardRdo, JwtPayloadDto, MongoIdValidationPipe, TransformAndValidateDtoInterceptor, TransformAndValidateQueryInterceptor } from '@guitar-shop/shared-types';
import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { JwtAuthUsersGuard } from '../../assets/guard/jwt-auth-users.guard';
import { BffEnvInterface } from '../../assets/interface/bff-env.interface';

@Controller('orders')
export class OrdersController {
  private readonly logger: LoggerService = new Logger(OrdersController.name);

  private readonly productsMicroserviceUrl: string;
  private readonly ordersMicroserviceUrl: string;

  constructor(
    private readonly config: ConfigService<BffEnvInterface>,
  ) {
    this.productsMicroserviceUrl = `http://${config.get("PRODUCTS_MICROSERVICE_HOST")}:${config.get("PRODUCTS_MICROSERVICE_PORT")}`;
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
  async findOrderById(@Req() req: Request & { user: JwtPayloadDto, }, @Param('orderId', MongoIdValidationPipe) _orderId: string): Promise<GuitarShopOrderBffRdo> {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      throw new ForbiddenException('Доступ запрещен. Вы не являетесь администратором данного сервиса.');
    }

    const order = (await axios.get(`${this.ordersMicroserviceUrl}${req.url}`)).data as GuitarShopOrderRdo;

    const productIds = [];
    order.products.forEach(item => productIds.push(item.productId));

    const dtoToProductsMicroservice: GuitarShopFindProductsInterMicroserviceDto = {
      productsIds: productIds,
    };

    const products = (await axios.post(`${this.productsMicroserviceUrl}/api/products/productsfororders`, dtoToProductsMicroservice)).data as GuitarShopProductCardRdo[];

    const transformProductsArr = order.products.map(item => {
      const product = products.find(elem => elem.id === item.productId);

      const transformItem = {
        ...item,
        product: product,
      };

      delete transformItem.productId;

      return transformItem;
    }) as unknown as GuitarShopOrderProductItemInterface[];


    return {
      ...order,
      products: transformProductsArr,
    } as GuitarShopOrderBffRdo;
  }

  @Get('/')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarOrdersQuery))
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.OK)
  async findOrders(@Req() req: Request & { user: JwtPayloadDto, }): Promise<[GuitarShopOrderBffRdo[], number]> {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      throw new ForbiddenException('Доступ запрещен. Вы не являетесь администратором данного сервиса.');
    }

    const [orders, count] = (await axios.get(`${this.ordersMicroserviceUrl}${req.url}`)).data as [GuitarShopOrderRdo[], number];
    const productIds = Array.from(new Set(orders.map(item => {
      const productIds = [];

      item.products.forEach(item => productIds.push(item.productId));

      return productIds;
    }).flat()));

    const dtoToProductsMicroservice: GuitarShopFindProductsInterMicroserviceDto = {
      productsIds: productIds,
    };

    const products = (await axios.post(`${this.productsMicroserviceUrl}/api/products/productsfororders`, dtoToProductsMicroservice)).data as GuitarShopProductCardRdo[];

    const transformOrders = orders.map(item => {
      const transformItem = {
        ...item,
      };

      transformItem.products = item.products.map(item => {
        const product = products.find(elem => elem.id === item.productId);

        const transformItem = {
          ...item,
          product: product,
        };

        delete transformItem.productId;

        return transformItem;
      });

      return transformItem;
    }) as unknown as GuitarShopOrderBffRdo[];


    return [transformOrders, count]
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
