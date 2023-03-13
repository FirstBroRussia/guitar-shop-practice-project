import { OrderStateSortEnum } from '../enum/order-state-sort.enum';


export type OrderStateSortType = typeof OrderStateSortEnum[keyof typeof OrderStateSortEnum];
