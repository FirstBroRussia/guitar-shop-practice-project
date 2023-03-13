import { GuitarShopOrderInterface, GuitarShopOrderProductItemBffInterface } from "@guitar-shop/shared-types";
import { Expose } from "class-transformer";


export class GuitarShopOrderBffRdo implements GuitarShopOrderInterface {
  @Expose()
  id: string;

  @Expose()
  products: GuitarShopOrderProductItemBffInterface[];

  @Expose()
  totalCount: number;

  @Expose()
  totalPrice: number;

  @Expose()
  createdAt: string;
}
