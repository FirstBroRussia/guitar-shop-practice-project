import { CatalogStateSortType } from './catalog-state-sort.type';
import { GuitarStringsType } from './guitar-strings.type';
import { GuitarType } from './guitar.type';


export type CatalogStateType = {
  page: number;
  sort: CatalogStateSortType;
  guitarTypeArr: GuitarType[];
  guitarStringsArr: GuitarStringsType[];
};
