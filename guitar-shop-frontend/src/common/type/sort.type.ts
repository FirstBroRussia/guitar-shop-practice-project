import { SortTypeEnum } from '../enum/catalog-sort.enum';


export type SortType = typeof SortTypeEnum[keyof typeof SortTypeEnum];
