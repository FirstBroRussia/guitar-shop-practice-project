import { ProductCardDataType } from './product-card-data.type';


export type OrderProductsListWithProductDataType = {
  product: ProductCardDataType;
  price: number;
  count: number;
  totalPrice: number;
};
