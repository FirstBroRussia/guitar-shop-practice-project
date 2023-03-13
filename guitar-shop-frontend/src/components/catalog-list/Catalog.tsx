
import { useEffect, useMemo, useState } from 'react';
import { SortOrderEnum, SortTypeEnum } from '../../common/enum/catalog-sort.enum';
import { CatalogStateSortEnum } from '../../common/enum/catalog-state-sort.enum';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { GuitarStringsEnum } from '../../common/enum/guitar-strings.enum';
import { GuitarEnum } from '../../common/enum/guitar.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { CatalogFilterValueType } from '../../common/type/catalog-filter.type';
import { CatalogSortType } from '../../common/type/catalog-sort.type';
import { CatalogStateSortType } from '../../common/type/catalog-state-sort.type';
import { CatalogStateType } from '../../common/type/catalog-state.type';
import { ProductCardDataType } from '../../common/type/product-card-data.type';
import { asyncGetProductCardListAction } from '../../store/async-action/async-action';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import CatalogFilter from './catalog-filter/Catalog-filter';
import CatalogSort from './catalog-sort/Catalog-sort';
import PaginationList from '../pagination/Pagination-list';
import ProductCard from '../product-card/Product-card';


const initialStateCatalogFilterValues: CatalogFilterValueType = {
  minPricePlaceholder: ConstantValueEnum.DEFAULT_CATALOG_FILTER_MIN_PRICE,
  maxPricePlaceholder: ConstantValueEnum.DEFAULT_CATALOG_FILTER_MAX_PRICE,

  minPriceValue: ConstantValueEnum.DEFAULT_CATALOG_FILTER_MIN_PRICE,
  maxPriceValue: ConstantValueEnum.DEFAULT_CATALOG_FILTER_MAX_PRICE,
};

const initialStateCatalogSortValues: CatalogSortType = {
  sortType: SortTypeEnum.SortPrice,
  sortOrder: SortOrderEnum.SortAsc,
};

const initialCatalogStateValues: CatalogStateType = {
  page: 1,
  sort: CatalogStateSortEnum.PriceAsc,
  guitarTypeArr: [GuitarEnum.Acoustic, GuitarEnum.Electro, GuitarEnum.Ukulele],
  guitarStringsArr: [GuitarStringsEnum.Four, GuitarStringsEnum.Six, GuitarStringsEnum.Seven, GuitarStringsEnum.Twelve],
};


export default function Catalog() {
  const dispatch = useAppDispatch();


  const [catalogFilterState, setCatalogFilterState] = useState<CatalogFilterValueType>(initialStateCatalogFilterValues);
  const [catalogSortState, setCatalogSortState] = useState<CatalogSortType>(initialStateCatalogSortValues);
  const [catalogState, setCatalogState] = useState<CatalogStateType>(initialCatalogStateValues);


  const productCardListData = useAppSelector((state) => state[SliceEnum.ProductsSlice].productCardListData) as [ProductCardDataType[], number];
  const productCardList = useMemo(() => {
    let minPrice = 0;
    let maxPrice = 0;

    productCardListData?.[0].forEach((item, index) => {
      const { price } = item;

      if (index === 0) {
        minPrice = price;
        maxPrice = price;
      }

      if (price < minPrice) {
        minPrice = price;
      }
      if (price > maxPrice) {
        maxPrice = price;
      }
    });

    setCatalogFilterState({
      ...catalogFilterState,
      minPricePlaceholder: minPrice,
      maxPricePlaceholder: maxPrice,
    });

    return productCardListData?.[0];
  }, [productCardListData]);


  useEffect(() => {
    if (catalogSortState === initialStateCatalogSortValues) {
      return;
    }

    const { sortType, sortOrder } = catalogSortState;
    const sortValue = `${sortType}_${sortOrder}` as CatalogStateSortType;

    setCatalogState({
      ...catalogState,
      sort: sortValue,
    });
  }, [catalogSortState]);

  useEffect(() => {
    dispatch(asyncGetProductCardListAction(catalogState));
  }, [catalogState]);


  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <Breadcrumbs currentPath={RoutePathEnum.Catalog} />
      <div className="catalog">
        <CatalogFilter catalogState={catalogState} setCatalogState={setCatalogState} catalogFilterState={catalogFilterState} setCatalogFilterState={setCatalogFilterState} />
        <CatalogSort currentPath={RoutePathEnum.Main} catalogSortState={catalogSortState} setCatalogSortState={setCatalogSortState} />
        <div className="cards catalog__cards">
          {
            productCardList && productCardList.length > 0 ? productCardList.map((item) => <ProductCard key={item.id} productData={item} />) :
              (
                <h2 className='page-content__title title'>Товаров нет</h2>
              )
          }
        </div>
        <div className="pagination page-content__pagination">
          <PaginationList elementCount={productCardListData?.[1]} defaultVisibleElement={ConstantValueEnum.DEFAULT_PRODUCT_CARDS_LIMIT} parentComponentState={catalogState} setParentComponentState={setCatalogState} />
        </div>
      </div>
    </div>
  );
}
