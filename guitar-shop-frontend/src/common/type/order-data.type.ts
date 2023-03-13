import { OrderProductsListWithProductDataType } from './order-product-list-with-product-data.type';


export type OrderDataType = {
  id: string;

  products: OrderProductsListWithProductDataType[];

  totalCount: number;

  totalPrice: number;

  createdAt: string;
};
