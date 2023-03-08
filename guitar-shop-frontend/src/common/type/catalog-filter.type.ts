import { GuitarStringsType } from './guitar-strings.type';
import { GuitarType } from './guitar.type';

export type CatalogFilterValueType = {
  minPricePlaceholder: number;
  maxPricePlaceholder: number;

  minPriceValue: number;
  maxPriceValue: number;
  guitarTypeArr: GuitarType[];
  guitarStringsArr: GuitarStringsType[];
};
