import { CatalogSortOrderEnum, CatalogSortTypeEnum } from '../enum/catalog-sort.enum';

export type SortType = typeof CatalogSortTypeEnum[keyof typeof CatalogSortTypeEnum];
export type OrderType = typeof CatalogSortOrderEnum[keyof typeof CatalogSortOrderEnum];

export type CatalogSortType = {
  sortType: SortType;
  sortOrder: OrderType;
};
