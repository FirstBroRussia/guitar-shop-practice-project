import { GuitarShopProductCardRdo } from "@guitar-shop/shared-types";


export interface GuitarShopOrderProductItemBffInterface {
  product?: GuitarShopProductCardRdo;
  price?: number;
  count?: number;
  totalPrice?: number;
}
