import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { SortOrderEnum, SortTypeEnum } from '../../../common/enum/catalog-sort.enum';
import { OrderStateSortType } from '../../../common/type/order-state-sort.type';
import { OrderStateType } from '../../../common/type/order-state.type';
import { SortOrderType } from '../../../common/type/sort-order.type';
import { SortType } from '../../../common/type/sort.type';

const SORT_BUTTON_ACTIVE_CLASS = 'catalog-sort__type-button--active';
const SORT_ORDER_BUTTON_ACTIVE_CLASS = 'catalog-sort__order-button--active';


type InitialSortStateType = {
  sort: SortType;
  order: SortOrderType;
};

type OrderSortPropsType = {
  orderComponentState: OrderStateType;
  setOrderComponentState: Dispatch<SetStateAction<OrderStateType>>;
};

const initialSortState: InitialSortStateType = {
  sort: SortTypeEnum.SortPrice,
  order: SortOrderEnum.SortDesc,
};


export default function OrderSort({ orderComponentState, setOrderComponentState }: OrderSortPropsType) {
  const sortWrapperRef = useRef<HTMLDivElement>(null);
  const sortOrderWrapperRef = useRef<HTMLDivElement>(null);

  const [sortState, setSortState] = useState(initialSortState);


  const onDateSortClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    sortWrapperRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_BUTTON_ACTIVE_CLASS));
    (evt.target as HTMLElement).classList.add(SORT_BUTTON_ACTIVE_CLASS);

    setSortState({
      ...sortState,
      sort: SortTypeEnum.SortDate as SortType,
    });

    setOrderComponentState({
      ...orderComponentState,
      sort: `${SortTypeEnum.SortDate}_${sortState.order}` as OrderStateSortType,
    });
  }, [sortState, orderComponentState]);

  const onPriceSortClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    sortWrapperRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_BUTTON_ACTIVE_CLASS));
    (evt.target as HTMLElement).classList.add(SORT_BUTTON_ACTIVE_CLASS);

    setSortState({
      ...sortState,
      sort: SortTypeEnum.SortPrice as SortType,
    });

    setOrderComponentState({
      ...orderComponentState,
      sort: `${SortTypeEnum.SortPrice}_${sortState.order}` as OrderStateSortType,
    });
  }, [sortState, orderComponentState]);

  const onAscOrderSortClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    sortOrderWrapperRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_ORDER_BUTTON_ACTIVE_CLASS));
    (evt.target as HTMLElement).classList.add(SORT_ORDER_BUTTON_ACTIVE_CLASS);

    setSortState({
      ...sortState,
      order: SortOrderEnum.SortAsc as SortOrderType,
    });

    setOrderComponentState({
      ...orderComponentState,
      sort: `${sortState.sort}_${SortOrderEnum.SortAsc}` as OrderStateSortType,
    });
  }, [sortState, orderComponentState]);

  const onDescOrderSortClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    sortOrderWrapperRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_ORDER_BUTTON_ACTIVE_CLASS));
    (evt.target as HTMLElement).classList.add(SORT_ORDER_BUTTON_ACTIVE_CLASS);

    setSortState({
      ...sortState,
      order: SortOrderEnum.SortDesc as SortOrderType,
    });

    setOrderComponentState({
      ...orderComponentState,
      sort: `${sortState.sort}_${SortOrderEnum.SortDesc}` as OrderStateSortType,
    });
  }, [sortState, orderComponentState]);


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div ref={sortWrapperRef} className="catalog-sort__type">
        <button className="catalog-sort__type-button" aria-label="по дате" onClick={onDateSortClickHandler} >по дате</button>
        <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене" onClick={onPriceSortClickHandler} >по цене</button>
      </div>
      <div ref={sortOrderWrapperRef} className="catalog-sort__order">
        <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" onClick={onAscOrderSortClickHandler} ></button>
        <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию" onClick={onDescOrderSortClickHandler} ></button>
      </div>
    </div>
  );
}
