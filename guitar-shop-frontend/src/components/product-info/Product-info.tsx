/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../common/api/axios.api';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { ModalNameEnum } from '../../common/enum/modal-name.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { getGuitarTypeString } from '../../common/helper/helper';
import { asyncGetProductCardDataByIdAction } from '../../store/async-action/async-action';
import { addProductInProductCartAction } from '../../store/slice/cart.slice';
import { setOpenModalAction } from '../../store/slice/modal.slice';
import { setProductCardDataAction } from '../../store/slice/products.slice';
import { setPaginationPageAction } from '../../store/slice/review.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import ReviewList from '../review-list/Review-list';
import EmptyStarSvg from '../svg/rate/Empty-star.svg';
import FullStarSvg from '../svg/rate/Full-star.svg';


const transformBackendUrl = BACKEND_URL.replace('/api', '');


export default function ProductInfo() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthorization = useAppSelector((state) => state[SliceEnum.UserSlice].isAuthorization);

  const resetDefaultValueForProductInfoComponentCallback = useCallback(() => {
    dispatch(setProductCardDataAction(null));
    dispatch(setPaginationPageAction(1));
  }, []);


  if (location.hash.length === 0) {
    navigate(RoutePathEnum.ProductCardCharacteristics, {
      replace: true,
    });
  }

  const { productId } = useParams() as { productId: string };

  useEffect(() => {
    dispatch(asyncGetProductCardDataByIdAction(productId));

    return () => {
      resetDefaultValueForProductInfoComponentCallback();
    };
  }, []);


  const productCardData = useAppSelector((state) => state[SliceEnum.ProductsSlice].productCardData);


  const onBuyLinkClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    evt.preventDefault();

    if (isAuthorization) {
      dispatch(addProductInProductCartAction(productCardData!));
      dispatch(setOpenModalAction(ModalNameEnum.SuccessCartModal));
    } else {
      dispatch(setOpenModalAction(ModalNameEnum.EnterModal));
    }
  }, [isAuthorization, productCardData]);


  if (!productCardData) {
    return null;
  }

  const { id, title, imageLink, article, guitarType, guitarStringsCount, rating, commentsCount, price, description } = productCardData;


  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">Товар</h1>
      <Breadcrumbs currentPath={RoutePathEnum.ProductCard} />
      <div className="product-container" data-id={id}>
        <img className="product-container__img" src={`${transformBackendUrl}${imageLink}`} srcSet={`${transformBackendUrl}${imageLink.replace('.png', '')}@2x.png 2x`} width={90} height={235} alt={title} />
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">{title}</h2>
          <div className="rate product-container__rating">
            {
              Array(Math.trunc(rating)).fill('').map((_item, index) => <FullStarSvg key={`full-star-${index + 1}`} />)
            }
            {
              Array(ConstantValueEnum.DEFAULT_RATING_MAX_VALUE - Math.trunc(rating)).fill('').map((_item, index) => <EmptyStarSvg key={`empty-star-${index + 1}`} />)
            }
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{commentsCount}</p>
          </div>
          <div className="tabs">
            <a className={`button ${ location.hash !== RoutePathEnum.ProductCardCharacteristics ? 'button--black-border' : '' } button--medium tabs__button`} href="#characteristics">Характеристики</a>
            <a className={`button ${ location.hash !== RoutePathEnum.ProductCardDescription ? 'button--black-border' : '' } button--medium tabs__button`} href="#description">Описание</a>
            <div className="tabs__content" id="characteristics">
              <table className={`tabs__table ${ location.hash === RoutePathEnum.ProductCardCharacteristics ? '' : 'hidden' }`}>
                <tbody>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Артикул:</td>
                    <td className="tabs__value">{article}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Тип:</td>
                    <td className="tabs__value">{getGuitarTypeString(guitarType)}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Количество струн:</td>
                    <td className="tabs__value">{`${guitarStringsCount} струнная`}</td>
                  </tr>
                </tbody>
              </table>
              <p className={`tabs__product-description ${ location.hash === RoutePathEnum.ProductCardDescription ? '' : 'hidden' }`} id="description" >{description}</p>
            </div>
          </div>
        </div>
        <div className="product-container__price-wrapper">
          <p className="product-container__price-info product-container__price-info--title">Цена:</p>
          <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
          <Link className="button button--red button--big product-container__button" to="#" onClick={onBuyLinkClickHandler} >Добавить в корзину</Link>
        </div>
      </div>
      <ReviewList productId={id} />
    </div>
  );
}
