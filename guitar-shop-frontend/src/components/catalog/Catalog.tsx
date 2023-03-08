import { useEffect, useMemo, useRef, useState } from 'react';
import { CatalogSortOrderEnum, CatalogSortTypeEnum } from '../../common/enum/catalog-sort.enum';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { GuitarStringsEnum } from '../../common/enum/guitar-strings.enum';
import { GuitarEnum } from '../../common/enum/guitar.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { CatalogFilterValueType } from '../../common/type/catalog-filter.type';
import { CatalogSortType } from '../../common/type/catalog-sort.type';
import { ProductCardServerResponseType } from '../../common/type/product-card-server-response.type';
import { asyncGetProductCardListAction } from '../../store/async-action/async-action';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import CatalogFilter from '../catalog-filter/Catalog-filter';
import CatalogSort from '../catalog-sort/Catalog-sort';


const initialStateCatalogFilterValues: CatalogFilterValueType = {
  minPricePlaceholder: ConstantValueEnum.DEFAULT_CATALOG_FILTER_MIN_PRICE,
  maxPricePlaceholder: ConstantValueEnum.DEFAULT_CATALOG_FILTER_MAX_PRICE,

  minPriceValue: ConstantValueEnum.DEFAULT_CATALOG_FILTER_MIN_PRICE,
  maxPriceValue: ConstantValueEnum.DEFAULT_CATALOG_FILTER_MAX_PRICE,
  guitarTypeArr: [GuitarEnum.Acoustic, GuitarEnum.Electro, GuitarEnum.Ukulele],
  guitarStringsArr: [GuitarStringsEnum.Four, GuitarStringsEnum.Six, GuitarStringsEnum.Seven, GuitarStringsEnum.Twelve],
};

const initialStateCatalogSortValues: CatalogSortType = {
  sortType: CatalogSortTypeEnum.SortPrice,
  sortOrder: CatalogSortOrderEnum.SortAsc,
};


export default function Catalog() {
  // const isInit = useRef(false);

  const dispatch = useAppDispatch();


  const [catalogFilterState, setCatalogFilterState] = useState<CatalogFilterValueType>(initialStateCatalogFilterValues);
  const [catalogSortState, setCatalogSortState] = useState<CatalogSortType>(initialStateCatalogSortValues);

  const productCardList = useAppSelector((state) => state[SliceEnum.ProductsSlice].productCardList);

  const productCardListState = useMemo(() => productCardList, [productCardList]);


  useEffect(() => {
    if (catalogFilterState === initialStateCatalogFilterValues) {
      return;
    }

    console.log();
  } , [catalogFilterState]);

  useEffect(() => {
    if (catalogSortState === initialStateCatalogSortValues) {
      return;
    }

    const { sortType, sortOrder } = catalogSortState;
    const sortValue = `${sortType}_${sortOrder}`;
    console.log(sortValue);
  }, [catalogSortState]);

  useEffect(() => {
    const { sortType, sortOrder } = catalogSortState;
    const sortValue = `${sortType}_${sortOrder}`;

    // тут еще должен быть page
    dispatch(asyncGetProductCardListAction(`sort=${sortValue}`));
  }, []);

  console.log(productCardListState);

  return (
    <>
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <Breadcrumbs />
      <div className="catalog">
        <CatalogFilter catalogFilterState={catalogFilterState} setCatalogFilterState={setCatalogFilterState} />
        <CatalogSort currentPath={RoutePathEnum.Main} catalogSortState={catalogSortState} setCatalogSortState={setCatalogSortState} />
        <div className="cards catalog__cards">
          <div className="product-card"><img src="img/content/catalog-product-0.png" srcSet="img/content/catalog-product-0@2x.png 2x" width={75} height={190} alt="Liana Z100" />
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
              </div>
              <p className="product-card__title">Liana Z100</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>10 500 ₽
              </p>
            </div>
            <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
            </div>
          </div>
          <div className="product-card"><img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width={75} height={190} alt="Честер Bass" />
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>15</p>
              </div>
              <p className="product-card__title">Честер Bass</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>17 500 ₽
              </p>
            </div>
            <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red-border button--mini button--in-cart" href="#">В Корзине</a>
            </div>
          </div>
          <div className="product-card"><img src="img/content/catalog-product-2.png" srcSet="img/content/catalog-product-2@2x.png 2x" width={75} height={190} alt="Roman RX" />
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>76</p>
              </div>
              <p className="product-card__title">Roman RX</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>4 800 ₽
              </p>
            </div>
            <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
            </div>
          </div>
          <div className="product-card"><img src="img/content/catalog-product-3.png" srcSet="img/content/catalog-product-3@2x.png 2x" width={75} height={190} alt="Liana Z100" />
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
              </div>
              <p className="product-card__title">Liana Z100</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>10 500 ₽
              </p>
            </div>
            <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
            </div>
          </div>
          <div className="product-card"><img src="img/content/catalog-product-4.png" srcSet="img/content/catalog-product-4@2x.png 2x" width={75} height={190} alt="Roman RX" />
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>76</p>
              </div>
              <p className="product-card__title">Roman RX</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>4 800 ₽
              </p>
            </div>
            <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
            </div>
          </div>
          <div className="product-card"><img src="img/content/catalog-product-5.png" srcSet="img/content/catalog-product-5@2x.png 2x" width={75} height={190} alt="Честер Bass" />
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>15</p>
              </div>
              <p className="product-card__title">Честер Bass</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>17 500 ₽
              </p>
            </div>
            <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red-border button--mini button--in-cart" href="#">В Корзине</a>
            </div>
          </div>
          <div className="product-card"><img src="img/content/catalog-product-6.png" srcSet="img/content/catalog-product-6@2x.png 2x" width={75} height={190} alt="Честер Bass" />
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>15</p>
              </div>
              <p className="product-card__title">Честер Bass</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>17 500 ₽
              </p>
            </div>
            <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red-border button--mini button--in-cart" href="#">В Корзине</a>
            </div>
          </div>
          <div className="product-card"><img src="img/content/catalog-product-7.png" srcSet="img/content/catalog-product-7@2x.png 2x" width={75} height={190} alt="Liana Z100" />
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
              </div>
              <p className="product-card__title">Liana Z100</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>10 500 ₽
              </p>
            </div>
            <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
            </div>
          </div>
          <div className="product-card"><img src="img/content/catalog-product-8.png" srcSet="img/content/catalog-product-8@2x.png 2x" width={75} height={190} alt="Roman RX" />
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>76</p>
              </div>
              <p className="product-card__title">Roman RX</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>4 800 ₽
              </p>
            </div>
            <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
            </div>
          </div>
        </div>
        <div className="pagination page-content__pagination">
          <ul className="pagination__list">
            <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href={1}>1</a>
            </li>
            <li className="pagination__page"><a className="link pagination__page-link" href={2}>2</a>
            </li>
            <li className="pagination__page"><a className="link pagination__page-link" href={3}>3</a>
            </li>
            <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href={2}>Далее</a>
            </li>
          </ul>
        </div>
      </div>

    </>
  );
}
