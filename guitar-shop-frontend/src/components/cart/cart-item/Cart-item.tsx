import { useCallback } from 'react';

import { BACKEND_URL } from '../../../common/api/axios.api';
import { ModalNameEnum } from '../../../common/enum/modal-name.enum';
import { getGuitarTypeString } from '../../../common/helper/helper';
import { addProductInProductCartAction, decrementProductInProductCartAction, ProductCartType, setTargetDeleteProductCartDataAction } from '../../../store/slice/cart.slice';
import { setOpenModalAction } from '../../../store/slice/modal.slice';
import { useAppDispatch } from '../../../store/store';


const transformBackendUrl = BACKEND_URL.replace('/api', '');


export default function CartItem({ productData, count }: ProductCartType) {
  const dispatch = useAppDispatch();

  const { title, imageLink, article, guitarType, guitarStringsCount, price } = productData;


  const onDecProductCountClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(decrementProductInProductCartAction(productData));
  }, [productData]);

  const onIncProductCountClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(addProductInProductCartAction(productData));
  }, [productData]);

  const onDeleteProductFromCartButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(setTargetDeleteProductCartDataAction({
      productData,
      count,
    }));
    dispatch(setOpenModalAction(ModalNameEnum.DeleteCartModal));
  }, [productData, count]);


  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={onDeleteProductFromCartButtonClickHandler} >
        <span className="button-cross__icon" />
        <span className="cart-item__close-button-interactive-area" />
      </button>
      <div className="cart-item__image">
        <img src={`${transformBackendUrl}${imageLink}`} srcSet={`${transformBackendUrl}${imageLink.replace('.png', '')}@2x.png 2x`} width={55} height={130} alt={title} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{title}</p>
        <p className="product-info__info">Артикул: {article}</p>
        <p className="product-info__info">{getGuitarTypeString(guitarType)}, {guitarStringsCount} струнная</p>
      </div>
      <div className="cart-item__price">{price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={onDecProductCountClickHandler} >
          <svg width={8} height={8} aria-hidden="true">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <input className="quantity__input" type="number" value={count} id="1-count" name="1-count" max={99} />
        <button className="quantity__button" aria-label="Увеличить количество" onClick={onIncProductCountClickHandler} >
          <svg width={8} height={8} aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{price * count} ₽</div>
    </div>
  );
}
