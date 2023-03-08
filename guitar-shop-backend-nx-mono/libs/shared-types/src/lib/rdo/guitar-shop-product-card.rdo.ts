import { Expose } from "class-transformer";
import { GuitarShopProductCardInterface } from "../interface/guitar-shop-product-card.interface";
import { GuitarStringsType } from "../type/guitar-strings.type";
import { GuitarType } from "../type/guitar.type";

export class GuitarShopProductCardRdo implements GuitarShopProductCardInterface {
  @Expose()
  id: string;

  @Expose()
  title?: string;

  @Expose()
  description?: string;

  @Expose()
  guitarType: GuitarType;

  @Expose()
  article?: string;

  @Expose()
  guitarStringsCount?: GuitarStringsType;

  @Expose()
  rating?: number;

  @Expose()
  price?: number;

  @Expose()
  imageLink?: string;

  @Expose()
  createdAt?: Date;

}
