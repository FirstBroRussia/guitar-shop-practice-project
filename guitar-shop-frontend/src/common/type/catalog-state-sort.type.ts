import { CatalogStateSortEnum } from '../enum/catalog-state-sort.enum';

export type CatalogStateSortType = typeof CatalogStateSortEnum[keyof typeof CatalogStateSortEnum];
