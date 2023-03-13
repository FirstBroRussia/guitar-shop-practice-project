import { GuitarShopOrderBffRdo } from "@guitar-shop/shared-types";
import { Expose } from "class-transformer";


export class GuitarShopNotifySendNewOrderDto {
  @Expose()
  adminEmail: string;

  @Expose()
  order: GuitarShopOrderBffRdo;
}
