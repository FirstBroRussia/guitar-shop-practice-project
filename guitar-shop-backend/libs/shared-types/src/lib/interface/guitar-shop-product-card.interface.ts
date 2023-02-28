import { GuitarStringsType } from "../type/guitar-strings.type";
import { GuitarType } from "../type/guitar.type";

export interface GuitarShopProductCardInterface {
  title?: string;
  description?: string;
  createdAt?: Date;
  imageLink?: string;
  guitarType: GuitarType,
  article?: string;
  guitarStringsCount?: GuitarStringsType;
  rating?: number;
  price?: number;
}
