import { CreateProductType } from './create-product.type';


export type UpdateProductDtoType = {
  productId: string;
  productData: CreateProductType;
};
