/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { SortOrderEnum, SortTypeEnum } from '../../../common/enum/catalog-sort.enum';
import { CatalogStateSortType } from '../../../common/type/catalog-state-sort.type';
import { CatalogStateType } from '../../../common/type/catalog-state.type';
import { SortOrderType } from '../../../common/type/sort-order.type';
import { SortType } from '../../../common/type/sort.type';


const SORT_BUTTON_ACTIVE_CLASS = 'catalog-sort__type-button--active';
const SORT_ORDER_BUTTON_ACTIVE_CLASS = 'catalog-sort__order-button--active';


type InitialSortStateType = {
  sort: SortType;
  order: SortOrderType;
};

type ProductSortPropsType = {
  parentComponentState: CatalogStateType;
  setParentComponentState: Dispatch<SetStateAction<CatalogStateType>>;
};


export default function ProductListSort({ parentComponentState, setParentComponentState }: ProductSortPropsType) {
  const sortWrapperRef = useRef<HTMLDivElement>(null);
  const sortOrderWrapperRef = useRef<HTMLDivElement>(null);

  const [sortState, setSortState] = useState<InitialSortStateType>({
    sort: parentComponentState.sort.substring(0, parentComponentState.sort.indexOf('_')) as SortType,
    order: parentComponentState.sort.substring(parentComponentState.sort.indexOf('_') + 1) as SortOrderType,
  });


  const onDateSortClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    sortWrapperRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_BUTTON_ACTIVE_CLASS));
    (evt.target as HTMLElement).classList.add(SORT_BUTTON_ACTIVE_CLASS);

    setSortState({
      ...sortState,
      sort: SortTypeEnum.SortDate as SortType,
    });

    setParentComponentState({
      ...parentComponentState,
      sort: `${SortTypeEnum.SortDate}_${sortState.order}` as CatalogStateSortType,
    });
  }, [sortState, parentComponentState]);

  const onPriceSortClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    sortWrapperRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_BUTTON_ACTIVE_CLASS));
    (evt.target as HTMLElement).classList.add(SORT_BUTTON_ACTIVE_CLASS);

    setSortState({
      ...sortState,
      sort: SortTypeEnum.SortPrice as SortType,
    });

    setParentComponentState({
      ...parentComponentState,
      sort: `${SortTypeEnum.SortPrice}_${sortState.order}` as CatalogStateSortType,
    });
  }, [sortState, parentComponentState]);

  const onRatingSortClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    sortWrapperRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_BUTTON_ACTIVE_CLASS));
    (evt.target as HTMLElement).classList.add(SORT_BUTTON_ACTIVE_CLASS);

    setSortState({
      ...sortState,
      sort: SortTypeEnum.SortPrice as SortType,
    });

    setParentComponentState({
      ...parentComponentState,
      sort: `${SortTypeEnum.SortRating}_${sortState.order}` as CatalogStateSortType,
    });
  }, [sortState, parentComponentState]);

  const onAscOrderSortClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    sortOrderWrapperRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_ORDER_BUTTON_ACTIVE_CLASS));
    (evt.target as HTMLElement).classList.add(SORT_ORDER_BUTTON_ACTIVE_CLASS);

    setSortState({
      ...sortState,
      order: SortOrderEnum.SortAsc as SortOrderType,
    });

    setParentComponentState({
      ...parentComponentState,
      sort: `${sortState.sort}_${SortOrderEnum.SortAsc}` as CatalogStateSortType,
    });
  }, [sortState, parentComponentState]);

  const onDescOrderSortClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    sortOrderWrapperRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_ORDER_BUTTON_ACTIVE_CLASS));
    (evt.target as HTMLElement).classList.add(SORT_ORDER_BUTTON_ACTIVE_CLASS);

    setSortState({
      ...sortState,
      order: SortOrderEnum.SortDesc as SortOrderType,
    });

    setParentComponentState({
      ...parentComponentState,
      sort: `${sortState.sort}_${SortOrderEnum.SortDesc}` as CatalogStateSortType,
    });
  }, [sortState, parentComponentState]);


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div ref={sortWrapperRef} className="catalog-sort__type">
        <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по дате" onClick={onDateSortClickHandler} >по дате</button>
        <button className="catalog-sort__type-button" aria-label="по цене" onClick={onPriceSortClickHandler} >по цене</button>
        <button className="catalog-sort__type-button" aria-label="по популярности" onClick={onRatingSortClickHandler} >по популярности</button>
      </div>
      <div ref={sortOrderWrapperRef} className="catalog-sort__order">
        <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" onClick={onAscOrderSortClickHandler} />
        <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию" onClick={onDescOrderSortClickHandler} />
      </div>
    </div>
  );
}
