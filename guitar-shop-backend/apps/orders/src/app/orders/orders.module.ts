import { Module } from '@nestjs/common';
import { OrdersRepositoryService } from '../orders-repository/orders-repository.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GuitarShopOrderEntity, GuitarShopOrderSchema } from '../orders-repository/entity/guitar-shop-order.entity';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GuitarShopOrderEntity.name, schema: GuitarShopOrderSchema, },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersRepositoryService],
})
export class OrdersModule {}
