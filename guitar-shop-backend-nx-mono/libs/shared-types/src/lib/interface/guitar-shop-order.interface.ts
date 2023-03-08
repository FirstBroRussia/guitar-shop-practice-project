export interface GuitarShopOrderProductItemInterface {
  productId?: string;
  price?: number;
  count?: number;
  totalPrice?: number;
}

export interface GuitarShopOrderInterface {
  products?: GuitarShopOrderProductItemInterface[];
  totalCount?: number;
  totalPrice?: number;
  createdAt?: string;
}
