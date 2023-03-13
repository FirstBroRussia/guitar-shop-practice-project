/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../common/api/axios.api';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { ModalNameEnum } from '../../common/enum/modal-name.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { ProductCardDataType } from '../../common/type/product-card-data.type';
import { setCurrentTargetAddCartProductDataAction, setOpenModalAction } from '../../store/slice/modal.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import EmptyStarSvg from '../svg/rate/Empty-star.svg';
import FullStarSvg from '../svg/rate/Full-star.svg';

const transformBackendUrl = BACKEND_URL.replace('/api', '');

type ProductCardPropsType = {
  productData: ProductCardDataType;
};


export default function ProductCard({ productData }: ProductCardPropsType) {
  const dispatch = useAppDispatch();

  const { id, title, rating, price, imageLink, commentsCount } = productData;

  const isAuthorization = useAppSelector((state) => state[SliceEnum.UserSlice].isAuthorization);


  const onBuyLinkClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    evt.preventDefault();

    if (isAuthorization) {
      dispatch(setCurrentTargetAddCartProductDataAction(productData));
      dispatch(setOpenModalAction(ModalNameEnum.AddCartModal));
    } else {
      dispatch(setOpenModalAction(ModalNameEnum.EnterModal));
    }
  }, [isAuthorization]);


  return (
    <div className="product-card" data-id={id}>
      <img src={`${transformBackendUrl}${imageLink}`} srcSet={`${transformBackendUrl}${imageLink.replace('.png', '')}@2x.png 2x`} width={75} height={190} alt={title} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            Array(Math.trunc(rating)).fill('').map((_item, index) => <FullStarSvg key={`full-star-${index + 1}`} />)
          }
          {
            Array(ConstantValueEnum.DEFAULT_RATING_MAX_VALUE - Math.trunc(rating)).fill('').map((_item, index) => <EmptyStarSvg key={`empty-star-${index + 1}`} />)
          }
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{commentsCount}</p>
        </div>
        <p className="product-card__title">{title}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {String(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${RoutePathEnum.Catalog}/${id}`}>Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to='#' onClick={onBuyLinkClickHandler} >Купить</Link>
      </div>
    </div>
  );
}

