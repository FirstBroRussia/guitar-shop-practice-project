import { Expose, Transform } from 'class-transformer';
import { GuitarShopOrderProductItemInterface, GuitarShopOrderInterface } from '@guitar-shop/shared-types';


export class GuitarShopOrderRdo implements GuitarShopOrderInterface {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @Expose()
  products: GuitarShopOrderProductItemInterface[];

  @Expose()
  totalCount: number;

  @Expose()
  totalPrice: number;

  @Expose()
  createdAt: string;
}
