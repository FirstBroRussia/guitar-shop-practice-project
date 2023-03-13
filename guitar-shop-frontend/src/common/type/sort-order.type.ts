import { SortOrderEnum } from '../enum/catalog-sort.enum';


export type SortOrderType = typeof SortOrderEnum[keyof typeof SortOrderEnum];
