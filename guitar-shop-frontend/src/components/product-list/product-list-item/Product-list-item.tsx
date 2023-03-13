import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { ConstantValueEnum } from '../../../common/enum/constant-value.enum';
import { getTransformDateForOrderComponents } from '../../../common/helper/helper';
import { ProductCardDataType } from '../../../common/type/product-card-data.type';
import { asyncDeleteProductByProductIdAction } from '../../../store/async-action/async-action';
import { useAppDispatch } from '../../../store/store';

import EmptyStarSvg from '../../svg/rate/Empty-star.svg';
import FullStarSvg from '../../svg/rate/Full-star.svg';


type ProductListItemPropsType = {
  productData: ProductCardDataType;
};


export default function ProductListItem({ productData }: ProductListItemPropsType) {
  const dispatch = useAppDispatch();

  const { id, title, imageLink, rating, createdAt, price } = productData;

  const onDeleteProductButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(asyncDeleteProductByProductIdAction(id));
  }, [id]);


  return (
    <li className="catalog-item" data-id={id}>
      <div className="catalog-item__data">
        <img src={`${ConstantValueEnum.TRNASFORM_BACKEND_URL}${imageLink}`} srcSet={`${ConstantValueEnum.TRNASFORM_BACKEND_URL}${imageLink.replace('.png', '')}@2x.png 2x`} width={36} height={93} alt={title} />
        <div className="catalog-item__data-wrapper">
          <p className="catalog-item__data-title">{title}</p>
          <div className="rate catalog-item__data-rate">
            {
              Array(Math.trunc(rating)).fill('').map((_item, index) => <FullStarSvg key={`full-star-${nanoid()}`} />)
            }
            {
              Array(ConstantValueEnum.DEFAULT_RATING_MAX_VALUE - Math.trunc(rating)).fill('').map((_item, index) => <EmptyStarSvg key={`empty-star-${nanoid()}`} />)
            }
            <p className="visually-hidden">Оценка: Хорошо</p>
          </div>
          <p className="catalog-item__data-date">Дата добавления {getTransformDateForOrderComponents(createdAt as unknown as string)}</p>
          <p className="catalog-item__data-price">{price} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link className="button button--small button--black-border" to={`/edit-product/${id}`} aria-label="Редактировать товар" >Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={onDeleteProductButtonClickHandler} >Удалить</button>
      </div>
    </li>
  );
}
