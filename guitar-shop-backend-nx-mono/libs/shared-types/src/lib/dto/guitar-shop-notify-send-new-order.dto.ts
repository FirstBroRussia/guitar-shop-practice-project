import { Expose } from "class-transformer";
import { GuitarShopOrderRdo } from "../rdo/guitar-shop-order.rto";

export class GuitarShopNotifySendNewOrderDto {
  @Expose()
  adminEmail: string;

  @Expose()
  order: GuitarShopOrderRdo;
}
