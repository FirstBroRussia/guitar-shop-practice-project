import { Document } from 'mongoose';

import { GuitarShopCreateOrderDto, GuitarShopOrderInterface, GuitarShopOrderProductItemInterface } from '@guitar-shop/shared-types';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GuitarShopOrderEntity extends Document { }


@Schema({
  collection: 'orders',
  timestamps: true,
})
export class GuitarShopOrderEntity implements GuitarShopOrderInterface {
  @Prop({
    required: true,
  })
  products?: GuitarShopOrderProductItemInterface[];

  @Prop({
    required: true,
  })
  totalCount?: number;

  @Prop({
    required: true,
  })
  totalPrice?: number;


  public fillObject(dto: GuitarShopCreateOrderDto) {
    const { products, totalCount, totalPrice } = dto;

    this.products = products;
    this.totalCount = totalCount;
    this.totalPrice = totalPrice;

    return this;
  }

}

export const GuitarShopOrderSchema = SchemaFactory.createForClass(GuitarShopOrderEntity);
