import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GuitarShopProductCardEntity from './entity/guitar-shop-product-card.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuitarShopProductCardEntity]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
