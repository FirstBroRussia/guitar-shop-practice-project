import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useRef } from 'react';
import { CatalogSortOrderEnum, CatalogSortTypeEnum } from '../../common/enum/catalog-sort.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { CatalogSortType, OrderType, SortType } from '../../common/type/catalog-sort.type';
import { RoutePathType } from '../../common/type/route-path.type';


const SORT_TYPE_BUTTON_ACTIVE_CLASS = 'catalog-sort__type-button--active';
const SORT_ORDER_BUTTON_ACTIVE_CLASS = 'catalog-sort__order-button--active';

type CatalogSortPropsType = {
  currentPath: RoutePathType;
  catalogSortState: CatalogSortType;
  setCatalogSortState: Dispatch<SetStateAction<CatalogSortType>>;
};


export default function CatalogSort({ currentPath, catalogSortState, setCatalogSortState }: CatalogSortPropsType) {
  const sortTypeListRef = useRef<HTMLDivElement | null>(null);
  const sortOrderListRef = useRef<HTMLDivElement | null>(null);

  const onSortTypeListClickHandler = useCallback((evt: SyntheticEvent<HTMLElement>) => {
    const targetSortTypeElement = (evt.target as HTMLDivElement).closest('button[class^=\'catalog-sort__type-button\']');

    if (!targetSortTypeElement) {
      return;
    }

    sortTypeListRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_TYPE_BUTTON_ACTIVE_CLASS));
    targetSortTypeElement.classList.add(SORT_TYPE_BUTTON_ACTIVE_CLASS);

    const sortType = targetSortTypeElement.getAttribute('data-sorttype') as SortType;
    setCatalogSortState({
      ...catalogSortState,
      sortType: sortType,
    });
  }, [catalogSortState, setCatalogSortState]);

  const onSortOrderListClickHandler = useCallback((evt: SyntheticEvent<HTMLElement>) => {
    const targetSortOrderElement = (evt.target as HTMLDivElement).closest('button[class^=\'catalog-sort__order-button\']');

    if (!targetSortOrderElement) {
      return;
    }

    sortOrderListRef.current?.childNodes.forEach((item) => (item as HTMLElement).classList.remove(SORT_ORDER_BUTTON_ACTIVE_CLASS));
    targetSortOrderElement.classList.add(SORT_ORDER_BUTTON_ACTIVE_CLASS);

    const sortOrder = targetSortOrderElement.getAttribute('data-sortorder') as OrderType;
    setCatalogSortState({
      ...catalogSortState,
      sortOrder: sortOrder,
    });
  }, [catalogSortState, setCatalogSortState]);


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div ref={sortTypeListRef} className="catalog-sort__type" onClick={onSortTypeListClickHandler} >
        { currentPath === RoutePathEnum.ProductCardList && <button className="catalog-sort__type-button" data-sorttype={CatalogSortTypeEnum.SortDate} aria-label="по цене">по дате</button> }
        <button className="catalog-sort__type-button catalog-sort__type-button--active" data-sorttype={CatalogSortTypeEnum.SortPrice} aria-label="по цене">по цене</button>
        <button className="catalog-sort__type-button" data-sorttype={CatalogSortTypeEnum.SortRating} aria-label="по популярности">по популярности</button>
      </div>
      <div ref={sortOrderListRef} className="catalog-sort__order" onClick={onSortOrderListClickHandler} >
        <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" data-sortorder={CatalogSortOrderEnum.SortAsc} aria-label="По возрастанию" />
        <button className="catalog-sort__order-button catalog-sort__order-button--down" data-sortorder={CatalogSortOrderEnum.SortDesc} aria-label="По убыванию" />
      </div>
    </div>
  );
}
