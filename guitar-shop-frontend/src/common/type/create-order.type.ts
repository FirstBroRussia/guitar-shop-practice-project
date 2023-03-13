import { OrderProductsListType } from './order-product-list.type';


export type CreateOrderType = {
  products: OrderProductsListType[];
  totalCount: number;
  totalPrice: number;
};
