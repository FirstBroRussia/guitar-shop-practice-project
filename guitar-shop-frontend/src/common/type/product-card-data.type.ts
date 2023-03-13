import { GuitarStringsType } from './guitar-strings.type';
import { GuitarType } from './guitar.type';


export type ProductCardDataType = {
  id: string;

  title: string;

  description: string;

  guitarType: GuitarType;

  article: string;

  guitarStringsCount: GuitarStringsType;

  rating: number;

  price: number;

  imageLink: string;

  commentsCount: number;

  createdAt: string;

}

