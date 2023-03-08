import { FindGuitarOrdersQuery, GuitarShopCreateOrderDto, GuitarShopOrdersConstantValue } from '@guitar-shop/shared-types';
import { Injectable, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { GuitarShopOrderEntity } from './entity/guitar-shop-order.entity';

@Injectable()
export class OrdersRepositoryService {
  private readonly logger: LoggerService = new Logger(OrdersRepositoryService.name);

  constructor (
    @InjectModel(GuitarShopOrderEntity.name) private readonly ordersModel: Model<GuitarShopOrderEntity>,
  ) { }


  public async createOrder(dto: GuitarShopCreateOrderDto): Promise<GuitarShopOrderEntity> {
    const newOrder = new GuitarShopOrderEntity().fillObject(dto);
    const newOrderModel = new this.ordersModel(newOrder);

    const result = await newOrderModel.save();
    this.logger.log('Создан новый заказ');

    return result;
  }

  public async findOrderById(orderId: string): Promise<GuitarShopOrderEntity> {
    const result = await this.ordersModel.findById(orderId);

    if (!result) {
      throw new NotFoundException(`Заказа с ID: ${orderId} не существует.`);
    }

    return result;
  }

  public async findOrders(query: FindGuitarOrdersQuery): Promise<[GuitarShopOrderEntity[], number]> {
    const { page, sort } = query;
    const { dateSort, priceSort } = sort;

    const count = await this.ordersModel.count({});

    const options: QueryOptions<GuitarShopOrderEntity> = {
      limit: GuitarShopOrdersConstantValue.DEFAULT_ORDERS_LIMIT,
      skip: GuitarShopOrdersConstantValue.DEFAULT_ORDERS_LIMIT * (page - 1),
    };

    if (dateSort) {
      options.sort = { createdAt: dateSort };
    } else if (priceSort) {
      options.sort = { totalPrice: priceSort };
    } else {
      options.sort = { createdAt: -1 };
    }

    const orders = await this.ordersModel.find({}, null, options).exec();

    return [orders, count];
  }

  public async deleteOrder(orderId: string): Promise<void> {
    const result = await this.ordersModel.findByIdAndDelete(orderId);

    if (!result) {
      throw new NotFoundException(`Заказа с ID: ${orderId} не существует.`);
    }

    this.logger.log(`Удален заказ c ID: ${orderId}`);
  }

}
