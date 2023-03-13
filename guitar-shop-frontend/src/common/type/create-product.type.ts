import { GuitarStringsType } from './guitar-strings.type';
import { GuitarType } from './guitar.type';


export type CreateProductType = {
  title: string;
  description: string;
  guitarType: GuitarType;
  guitarStringsCount: GuitarStringsType;
  article: string;
  price: number;
};
