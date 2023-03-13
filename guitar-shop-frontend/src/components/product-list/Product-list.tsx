import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CatalogStateSortEnum } from '../../common/enum/catalog-state-sort.enum';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { GuitarStringsEnum } from '../../common/enum/guitar-strings.enum';
import { GuitarEnum } from '../../common/enum/guitar.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { CatalogStateType } from '../../common/type/catalog-state.type';
import { asyncGetProductCardListAction } from '../../store/async-action/async-action';
import { useAppDispatch, useAppSelector } from '../../store/store';

import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import PaginationList from '../pagination/Pagination-list';
import ProductListFilter from './product-list-filter/Product-list-filter';
import ProductListItem from './product-list-item/Product-list-item';
import ProductListSort from './product-list-sort/Product-list-sort';


const initialProductListStateValues: CatalogStateType = {
  page: 1,
  sort: CatalogStateSortEnum.DateDesc,
  guitarTypeArr: [GuitarEnum.Acoustic, GuitarEnum.Electro, GuitarEnum.Ukulele],
  guitarStringsArr: [GuitarStringsEnum.Four, GuitarStringsEnum.Six, GuitarStringsEnum.Seven, GuitarStringsEnum.Twelve],
};


export default function ProductList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [componentState, setComponentState] = useState(initialProductListStateValues);

  const onAddProductButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    navigate(RoutePathEnum.AddProductCard);
  }, []);

  useEffect(() => {
    dispatch(asyncGetProductCardListAction(componentState));
  }, [componentState]);

  const productCardListData = useAppSelector((state) => state[SliceEnum.ProductsSlice].productCardListData);

  if (!productCardListData) {
    return null;
  }


  return (
    <section className="product-list">
      <div className="container">
        <h1 className="product-list__title">Список товаров</h1>
        <Breadcrumbs currentPath={RoutePathEnum.ProductList} />
        <div className="catalog">
          <ProductListFilter parentComponentState={componentState} setParentComponentState={setComponentState} />
          <ProductListSort parentComponentState={componentState} setParentComponentState={setComponentState} />
          <div className="catalog-cards">
            <ul className="catalog-cards__list">
              {
                productCardListData[0].length > 0 ? productCardListData[0].map((item) => <ProductListItem key={item.id} productData={item} />) :
                  <h2 className='page-content__title title'>Товаров нет</h2>
              }
            </ul>
          </div>
        </div>
        <button className="button product-list__button button--red button--big" onClick={onAddProductButtonClickHandler} >Добавить новый товар</button>
        <div className="pagination product-list__pagination">
          <PaginationList elementCount={productCardListData?.[1]} defaultVisibleElement={ConstantValueEnum.DEFAULT_PRODUCT_CARDS_LIMIT} parentComponentState={componentState} setParentComponentState={setComponentState} />
        </div>
      </div>
    </section>

  );
}
